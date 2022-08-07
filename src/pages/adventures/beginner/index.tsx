import Spacer from "components/Spacer"
import type { NextPage } from "next"
import useMetaMask from "hooks/useMetaMask"
import Button from "components/Button"
import PageTitle from "components/PageTitle"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Card from "components/Card"
import PageP from "components/PageP"
import PageContent from "components/PageContent"

const Adventure: NextPage = () => {
  const router = useRouter()
  const { connectWallet, account, walletInstalled, isConnected } = useMetaMask()

  useEffect(() => {
    if (!isConnected) {
      connectWallet()
    }
  }, [])

  const onContinue = () => {
    router.push("/adventures/beginner/1")
  }

  const renderMetaMaskNotConnected = () => {
    return (
      <Card>
        <h3 className="text-xl mb-4 font-bold">Connect your wallet</h3>
        <p className="text-lg">
          We have detected that you have Metamask installed, but it is not
          connected yet. Click the button below to connect your wallet with the
          application.
        </p>
        <Spacer />
        <Button onClick={connectWallet}>Connect my wallet</Button>
      </Card>
    )
  }

  const renderMetaMaskConnected = () => {
    return (
      <>
        <Card className="border-green-300 border">
          <h3 className="text-xl mb-4 font-bold">Sweet!</h3>
          <p className="text-lg">
            You are now connected with your MetaMask wallet and ready to start
            your adventure.
          </p>
        </Card>
        <Spacer />
        <Button onClick={onContinue}>Continue</Button>
      </>
    )
  }

  const renderMetaMaskNotInstalled = () => {
    return (
      <Card>
        <h3 className="text-xl mb-4 font-bold">MetaMask not installed</h3>
        <p className="text-lg">Please install Metamask to continue.</p>
      </Card>
    )
  }

  return (
    <PageContent>
      <PageTitle>Create your wallet</PageTitle>
      <PageP>
        To enter the world of cryptocurrencies, you must have a wallet first.
        Think about a wallet as a bank account, but decentralized. It will be
        your bread and butter to interact with the blockchain network.
      </PageP>
      <Spacer />
      {!walletInstalled && renderMetaMaskNotInstalled()}
      {!isConnected && walletInstalled && renderMetaMaskNotConnected()}
      {isConnected && renderMetaMaskConnected()}
    </PageContent>
  )
}

export default Adventure
