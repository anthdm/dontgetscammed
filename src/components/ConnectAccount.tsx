import useEthereum from "hooks/useEthereum"
import Link from "next/link"
import React from "react"
import Button from "./Button"
import Card from "./Card"
import PageContent from "./PageContent"
import Spacer from "./Spacer"

const ConnectAccount: React.FC = () => {
  const { connect, walletInstalled } = useEthereum()

  if (walletInstalled) {
    return (
      <PageContent>
        <Card>
          <h3 className="text-xl mb-4 font-bold">Connect your wallet</h3>
          <p className="text-lg">
            We have detected that you have Metamask installed, but it is not
            connected yet. Click the button below to connect your wallet with
            the isolated application.
          </p>
          <Spacer />
          <Button onClick={connect}>Connect my wallet</Button>
        </Card>
      </PageContent>
    )
  }

  return (
    <PageContent>
      <Card className="border border-orange-400">
        <h3 className="text-xl mb-4 font-bold">
          MetaMask is not installed or enabled
        </h3>
        <Spacer />
        <Link href="https://metamask.io" target="_blank">
          <Button>Click to install MetaMask</Button>
        </Link>
      </Card>
    </PageContent>
  )
}

export default ConnectAccount
