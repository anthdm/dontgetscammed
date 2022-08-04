import { ethers } from "ethers"
import { useEffect, useState } from "react"

interface MetaMaskData {
  error: string | null
  isConnected: boolean
  hasMetaMask: boolean
  connect: () => void
  signer: ethers.providers.JsonRpcSigner | null
  account: string | null
}

const useMetaMask = (): MetaMaskData => {
  const [isConnected, setIsConnected] = useState(false)
  const [hasMetaMask, setHasMetaMask] = useState(false)
  const [error, setError] = useState(null)
  const [account, setAccount] = useState<string | null>(null)
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(
    null
  )

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetaMask(true)
    }
  })

  const connect = async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const [account] = await window.ethereum.request({
          method: "eth_requestAccounts"
        })
        setIsConnected(true)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        setSigner(provider.getSigner())
        setAccount(account)
      } catch (e: any) {
        setError(e.messages)
      }
    } else {
      setIsConnected(false)
    }
  }

  return {
    error,
    connect,
    hasMetaMask,
    isConnected,
    signer,
    account
  }
}

export default useMetaMask
