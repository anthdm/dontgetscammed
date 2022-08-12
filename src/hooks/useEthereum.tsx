import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers"
import { providers } from "ethers"
import React, { useCallback, useContext, useEffect, useState } from "react"

declare let window: {
  ethereum?: any
}

interface EthereumContext {
  account?: string
  signer?: JsonRpcSigner
  provider?: Web3Provider
  connect?: () => void
  disconnect?: () => void
  chainId?: number
  walletInstalled?: boolean
  switchChain?: (id: number) => Promise<void>
}

const EthereumContext = React.createContext<EthereumContext>({})

interface Props {
  children?: React.ReactNode
}

export const EthereumProvider = ({ children }: Props) => {
  const [account, setAccount] = useState<string>()
  const [provider, setProvider] = useState<Web3Provider>()
  const [signer, setSigner] = useState<JsonRpcSigner>()
  const [chainId, setChainId] = useState<number>()
  const [walletInstalled, setWalletInstalled] = useState(true)

  useEffect(() => {
    if (account) {
      const signer = provider?.getSigner()
      setSigner(signer)
    } else {
      setSigner(undefined)
    }
  }, [account, provider])

  const disconnect = async () => {
    localStorage.removeItem("DGSCONNECT")
    setAccount(undefined)
    setProvider(undefined)
    console.log("disconnected")
  }

  const switchChain = async (id: number): Promise<void> => {
    const instance = window.ethereum

    try {
      await instance.request({
        method: "Wallet_SwitchEthereumChain",
        params: [{ chainId: id }]
      })
    } catch (e) {
      console.log(e)
    }
  }

  const addChainId = async () => {
    const instance = window.ethereum

    try {
      await instance.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: process.env.chainId,
            chainName: "Don't get scammed private network",
            rpcUrls: [process.env.rpcURL],
            nativeCurrency: {
              symbol: "ETH",
              decimals: 18
            }
          }
        ]
      })
    } catch (addError) {
      console.log(addError)
    }
  }

  const connect = useCallback(async () => {
    if (window.ethereum) {
      const instance = window.ethereum

      try {
        const chainId = await instance.request({ method: "eth_chainId" })
        setChainId(Number(chainId))

        addChainId()

        const [_account] = await instance.request!({
          method: "eth_requestAccounts"
        })
        setAccount(_account.toLowerCase())
        const provider = new providers.Web3Provider(instance, "any")
        setProvider(provider)

        localStorage.setItem("DGSCONNECT", "meta")

        console.log("registering callbacks")
        instance.on("chainChanged", (receivedChainId: string | number) => {
          const newChainId = Number(receivedChainId)
          console.log("chain changed to => ", newChainId)
          setChainId(newChainId)
        })
        instance.on("accountsChanged", (accounts: string[]) => {
          const [receivedAccount] = accounts
          console.log("account changed to => ", receivedAccount)
          setAccount(receivedAccount)
        })
      } catch (e: any) {
        console.log(e.message)
      }
    }
  }, [])

  useEffect(() => {
    console.log("initialize connection..")
    if (!window.ethereum) {
      setWalletInstalled(false)
    }
    if (localStorage.getItem("DGSCONNECT")) {
      connect()
    }
  }, [connect])

  return (
    <EthereumContext.Provider
      value={{
        account,
        signer,
        provider,
        connect,
        disconnect,
        chainId,
        walletInstalled,
        switchChain
      }}
    >
      {children}
    </EthereumContext.Provider>
  )
}

const useEthereum = () => {
  return useContext(EthereumContext)
}

export default useEthereum
