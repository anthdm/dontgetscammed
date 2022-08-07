import { ethers } from "ethers"
import { useEffect, useState } from "react"

interface MetaMaskData {
  walletInstalled: boolean
  connectWallet: () => void
  provider: ethers.providers.Web3Provider | null
  isConnected: boolean
  account: string
  balance: string
  getBalance: () => void
}

const useMetaMask = (connect?: boolean): MetaMaskData => {
  const [balance, setBalance] = useState("")
  const [account, setAccount] = useState("")
  const [walletInstalled, setWalletInstalled] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null)

  useEffect(() => {
    if (window.ethereum) {
      setWalletInstalled(true)
    }
  }, [])

  useEffect(() => {
    if (connect) {
      connectWallet()
    }
  }, [])

  const getBalance = async (): Promise<void> => {
    try {
      const signer = provider?.getSigner()
      const balance = await signer?.getBalance()
      setBalance(ethers.utils.formatUnits(balance!))
    } catch (e: any) {
      console.log(e.message)
    }
  }

  const connectWallet = async (): Promise<void> => {
    const _ethereum = window.ethereum as ethers.providers.ExternalProvider
    const _provider = new ethers.providers.Web3Provider(_ethereum)
    setProvider(_provider)

    try {
      const [_account] = await _ethereum.request!({
        method: "eth_requestAccounts"
      })
      setAccount(_account.toLowerCase())
      const signer = provider?.getSigner()
      const b = await signer?.getBalance()
      console.log(b)

      setIsConnected(true)
    } catch (e) {
      console.log(e)
    }
  }

  return {
    walletInstalled,
    connectWallet,
    provider,
    isConnected,
    account,
    balance,
    getBalance
  }
}

export default useMetaMask
