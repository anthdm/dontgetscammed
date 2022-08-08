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
}

const EthereumContext = React.createContext<EthereumContext>({})

interface Props {
  children?: React.ReactNode
}

export const EthereumProvider = ({ children }: Props) => {
  const [account, setAccount] = useState<string>()
  const [provider, setProvider] = useState<Web3Provider>()
  const [signer, setSigner] = useState<JsonRpcSigner>()

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

  const connect = async () => {
    if (window.ethereum) {
      const instance = window.ethereum
      try {
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
        disconnect
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
