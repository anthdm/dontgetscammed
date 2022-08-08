import { ethers } from "ethers"
import { useEffect, useState } from "react"

interface MetaMaskData {
  walletInstalled: boolean
  connect: () => void
  provider: ethers.providers.Web3Provider | null
  isConnected: boolean
  account: string
}

const useMetaMask = (): MetaMaskData => {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState("")
  const [walletInstalled, setWalletInstalled] = useState(false)
  const [ethereum, setEthereum] =
    useState<ethers.providers.ExternalProvider | null>(null)
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null)

  const connect = async () => {
    try {
      const [_account] = await ethereum?.request!({
        method: "eth_requestAccounts"
      })
      console.log(_account)
      setAccount(_account.toLowerCase())
      setIsConnected(true)
    } catch (e: any) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      console.log("calling meta")
      setWalletInstalled(true)

      const ethereum = window.ethereum as ethers.providers.ExternalProvider
      const provider = new ethers.providers.Web3Provider(ethereum)
      setEthereum(ethereum)
      setProvider(provider)
    }
  }, [])

  useEffect(() => {
    if (ethereum) {
      ethereum.on("connect", (info: any) => {
        console.log("dfjkdjfkdjfkdfjkdfjkdjfkdjfjf")
        window.location.reload
      })
      ethereum.on("disconnect", (info: any) => {
        console.log("disconnect")
        window.location.reload
      })
      connect()
    }
  }, [ethereum])

  return {
    isConnected,
    connect,
    walletInstalled,
    provider,
    account
  }
}

export default useMetaMask

// interface MetaMaskData {
//   walletInstalled: boolean
//   connectWallet: () => void
//   provider: ethers.providers.Web3Provider | null
//   isConnected: boolean
//   account: string
//   balance: string
//   getBalance: () => void
// }

// const useMetaMask = (connect?: boolean): MetaMaskData => {
//   const [balance, setBalance] = useState("")
//   const [account, setAccount] = useState("")
//   const [walletInstalled, setWalletInstalled] = useState(false)
//   const [isConnected, setIsConnected] = useState(false)
//   const [provider, setProvider] =
//     useState<ethers.providers.Web3Provider | null>(null)

//   useEffect(() => {
//     if (window.ethereum) {
//       setWalletInstalled(true)
//     }
//   }, [])

//   useEffect(() => {
//     if (connect) {
//       connectWallet()
//     }
//   }, [])

//   const getBalance = async (): Promise<void> => {
//     try {
//       const signer = provider?.getSigner()
//       const balance = await signer?.getBalance()
//       setBalance(ethers.utils.formatUnits(balance!))
//     } catch (e: any) {
//       console.log(e.message)
//     }
//   }

//   const connectWallet = async (): Promise<void> => {
//     const _ethereum = window.ethereum as ethers.providers.ExternalProvider
//     const _provider = new ethers.providers.Web3Provider(_ethereum)
//     setProvider(_provider)

//     try {
//       const [_account] = await _ethereum.request!({
//         method: "eth_requestAccounts"
//       })
//       setAccount(_account.toLowerCase())
//       const signer = provider?.getSigner()
//       const b = await signer?.getBalance()
//       console.log(b)

//       setIsConnected(true)

//       _ethereum.on("disconnect", () => console.log("disconnect"))
//     } catch (e) {
//       console.log(e)
//     }
//   }

//   return {
//     walletInstalled,
//     connectWallet,
//     provider,
//     isConnected,
//     account,
//     balance,
//     getBalance
//   }
// }

// export default useMetaMask
