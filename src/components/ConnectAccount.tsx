import useEthereum from "hooks/useEthereum"
import React from "react"
import Button from "./Button"
import Card from "./Card"
import PageContent from "./PageContent"
import Spacer from "./Spacer"

const ConnectAccount: React.FC = () => {
  const { connect } = useEthereum()

  return (
    <PageContent>
      <Card>
        <h3 className="text-xl mb-4 font-bold">Connect your wallet</h3>
        <p className="text-lg">
          We have detected that you have Metamask installed, but it is not
          connected yet. Click the button below to connect your wallet with the
          isolated application.
        </p>
        <Spacer />
        <Button onClick={connect}>Connect my wallet</Button>
      </Card>
    </PageContent>
  )
}

export default ConnectAccount
