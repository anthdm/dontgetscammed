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

  const wallet = new ethers.Wallet(process.env.pk!)

  const provider = ethers.getDefaultProvider("https://dontgetscammed.network")
  const signer = wallet.connect(provider)

  try {
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

//0xd48dedceffe6c88e3cd768336ada55ab2cd5401e9f0b59008a2958f0cfcc4d69
