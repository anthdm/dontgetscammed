import type { NextApiRequest, NextApiResponse } from "next"
import { ethers } from "ethers"

type Data = {
  tx: string
}

type Error = {
  error: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  if (req.method !== "POST") {
    return res.status(200).json({ error: "method not allowed" })
  }

  const { address } = req.body
  if (address == undefined) {
    return res.status(400).json({ error: "invalid account address" })
  }

  const wallet = new ethers.Wallet(process.env.PK!)
  const provider = ethers.getDefaultProvider(process.env.chainHost)
  const signer = wallet.connect(provider)

  try {
    // Check the balance first, if the user already have balance dont add extra.
    const balance = await provider.getBalance(address)
    if (balance.gt(0)) {
      return res.status(200).json({ tx: "ok" })
    }

    const gasPrice = await provider.getGasPrice()
    const tx = {
      from: wallet.address,
      to: address,
      value: ethers.utils.parseEther("0.5"),
      nonce: provider.getTransactionCount(wallet.address, "latest"),
      gasLimit: ethers.utils.hexlify(100000),
      gasPrice: gasPrice
    }

    const txx = await signer.sendTransaction(tx)
    console.log("adding balance")
    return res.status(200).json({ tx: txx.hash })
  } catch (e: any) {
    console.log(e)
  }

  return res.status(200).json({ error: "hello" })
}
