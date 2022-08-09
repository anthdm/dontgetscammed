import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers"
import { providers } from "ethers"
import React, { useContext, useEffect, useState } from "react"

declare let window: {
  ethereum?: any
}

interface EthereumContext {
  account?: string
  signer?: JsonRpcSigner
  provider?: Web3Provider
  connect?: () => void
  disconnect?: () => void
  chainId?: string
}

const EthereumContext = React.createContext<EthereumContext>({})

interface Props {
  children?: React.ReactNode
}

export const EthereumProvider = ({ children }: Props) => {
  const [account, setAccount] = useState<string>()
  const [provider, setProvider] = useState<Web3Provider>()
  const [signer, setSigner] = useState<JsonRpcSigner>()
  const [chainId, setChainId] = useState<string>()

  useEffect(() => {
    if (account) {
      const signer = provider?.getSigner()
      setSigner(signer)
    } else {
      setSigner(undefined)
      console.log("disconnected")
    }
  }, [account])

  useEffect(() => {
    if (localStorage.getItem("DGSCONNECT")) {
      connect()
    }
  }, [])

  const disconnect = async () => {
    localStorage.clear()
    setAccount(undefined)
    setProvider(undefined)
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
            rpcUrls: ["https://dontgetscammed.network"],
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

  const connect = async () => {
    if (window.ethereum) {
      const instance = window.ethereum

      try {
        const chainId = await instance.request({ method: "eth_chainId" })
        setChainId(chainId)

        addChainId()

        const [_account] = await instance.request!({
          method: "eth_requestAccounts"
        })
        setAccount(_account.toLowerCase())
        const provider = new providers.Web3Provider(instance, "any")
        setProvider(provider)

        localStorage.setItem("DGSCONNECT", "meta")
      } catch (e: any) {
        console.log(e.message)
      }
    }
  }

  return (
    <EthereumContext.Provider
      value={{
        account,
        signer,
        provider,
        connect,
        disconnect,
        chainId
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
