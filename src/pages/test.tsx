import Button from "components/Button"
import useEthereum, { EthereumProvider } from "hooks/useEthereum"
import type { NextPage } from "next"
import React from "react"

const Page: NextPage = () => {
  const { disconnect, connect, account, signer, provider } = useEthereum()

  const buttonAction = account ? disconnect : connect
  const buttonText = account ? "Disconnect" : "Connect"

  return (
    <>
      <div>
        <button onClick={buttonAction}>{buttonText}</button>
        {account}
      </div>
    </>
  )
}

export default Page
