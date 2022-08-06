import detectEthereumProvider from "@metamask/detect-provider"
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

const useMetaMask = (): MetaMaskData => {
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
    const provider = new ethers.providers.Web3Provider(_ethereum)
    setProvider(provider)

    try {
      const [_account] = await _ethereum.request!({
        method: "eth_requestAccounts"
      })
      setAccount(_account.toLowerCase())
    } catch (e) {
      console.log(e)
    }

    const signer = provider?.getSigner()
    const b = await signer?.getBalance()
    console.log(b)

    setIsConnected(true)
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

// interface MetaMaskData {
//   error: string | null
//   isConnected: boolean
//   hasMetaMask: boolean
//   connect: () => void
//   signer: ethers.providers.JsonRpcSigner | null
//   account: string | null
//   getBalance: () => void
//   balance: string | null
// }

// const useMetaMask = (): MetaMaskData => {
//   const [isConnected, setIsConnected] = useState(false)
//   const [hasMetaMask, setHasMetaMask] = useState(false)
//   const [error, setError] = useState(null)
//   const [account, setAccount] = useState<string | null>(null)
//   const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(
//     null
//   )
//   const [balance, setBalance] = useState<string | null>(null)

//   useEffect(() => {
//     if (typeof window.ethereum !== "undefined") {
//       setHasMetaMask(true)
//     }
//   })

//   const getBalance = async (): Promise<void> => {
//     try {
//       const balance = await signer?.getBalance()
//       setBalance(ethers.utils.formatUnits(balance!))
//     } catch (e: any) {
//       setError(e.message)
//     }
//   }

//   // TODO: Change this with @metamask/detectprovider
//   const connect = async function connect() {
//     if (typeof window.ethereum !== "undefined") {
//       try {
//         const [account] = await window.ethereum.request({
//           method: "eth_requestAccounts"
//         })

//         setIsConnected(true)

//         const provider = new ethers.providers.Web3Provider(window.ethereum)
//         setSigner(provider.getSigner())

//         const blockNumber = await provider.getBlockNumber()
//         console.log(blockNumber)

//         setAccount(account)
//       } catch (e: any) {
//         setError(e.messages)
//       }
//     } else {
//       setIsConnected(false)
//     }
//   }

//   return {
//     error,
//     connect,
//     hasMetaMask,
//     isConnected,
//     signer,
//     account,
//     getBalance,
//     balance
//   }
// }

// export default useMetaMask
