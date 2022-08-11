import useEthereum from "hooks/useEthereum"
import Link from "next/link"
import React from "react"
import Button from "./Button"
import Card, { CardP, CardTitle } from "./Card"
import PageContent from "./PageContent"
import Spacer from "./Spacer"

const ConnectAccount: React.FC = () => {
  const { connect, walletInstalled } = useEthereum()

  if (walletInstalled) {
    return (
      <PageContent>
        <Card>
          <CardTitle>Connect your wallet</CardTitle>
          <CardP>
            We have detected that you have Metamask installed, but it is not
            connected yet. Click the button below to connect your wallet with
            the isolated application.
          </CardP>
          <Spacer />
          <Button onClick={connect}>Connect my wallet</Button>
        </Card>
      </PageContent>
    )
  }

  return (
    <PageContent>
      <Card className="border border-orange-400">
        <CardTitle>MetaMask is not installed or enabled</CardTitle>
        <Spacer />
        <Link href="https://metamask.io" target="_blank">
          <Button>Click to install MetaMask</Button>
        </Link>
      </Card>
    </PageContent>
  )
}

export default ConnectAccount
