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

  const wallet = new ethers.Wallet(
    "0x2dc9dec2f462d1c421ddade95dbf9c33f464b9ee68ac82d7cebe15b6d5fd546b"
  )

  const x = ethers.getDefaultProvider("http://127.0.0.1:8545")
  const signer = wallet.connect(x)

  const gasPrice = await x.getGasPrice()

  const tx = {
    from: wallet.address,
    to: address,
    value: ethers.utils.parseEther("0.5"),
    nonce: x.getTransactionCount(wallet.address, "latest"),
    gasLimit: ethers.utils.hexlify(100000),
    gasPrice: gasPrice
  }

  const txx = await signer.sendTransaction(tx)

  res.status(200).json({ tx: txx.hash })
}

//0xd48dedceffe6c88e3cd768336ada55ab2cd5401e9f0b59008a2958f0cfcc4d69
