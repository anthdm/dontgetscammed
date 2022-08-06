import detectEthereumProvider from "@metamask/detect-provider"
import { ethers } from "ethers"
import { useEffect, useState } from "react"

interface MetaMaskData {
  walletInstalled: boolean
  connectWallet: () => void
  provider: ethers.providers.Web3Provider | null
  ethereum: ethers.providers.ExternalProvider | null
  isConnected: boolean
  account: string
}

const useMetaMask = (): MetaMaskData => {
  const [account, setAccount] = useState("")
  const [walletInstalled, setWalletInstalled] = useState(false)
  const [ethereum, setEthereum] =
    useState<ethers.providers.ExternalProvider | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null)

  const detect = async (): Promise<void> => {
    const _provider =
      (await detectEthereumProvider()) as ethers.providers.ExternalProvider
    if (_provider) {
      const provider = new ethers.providers.Web3Provider(_provider)
      setWalletInstalled(true)
      setEthereum(_provider)
      setProvider(provider)
    }
  }

  const connectWallet = async (): Promise<void> => {
    if (!ethereum) {
      return
    }

    try {
      const [account] = await ethereum.request!({
        method: "eth_requestAccounts"
      })
      setAccount(account)
    } catch (e) {
      console.log(e)
    }

    const signer = provider?.getSigner()
    const b = await signer?.getBalance()
    console.log(b)

    setIsConnected(true)
  }

  useEffect(() => {
    detect()
  }, [])

  return {
    walletInstalled,
    connectWallet,
    provider,
    ethereum,
    isConnected,
    account
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
