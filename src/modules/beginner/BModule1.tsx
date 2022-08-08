import Button from "components/Button"
import PageTitle from "components/PageTitle"
import Spacer from "components/Spacer"
import Card from "components/Card"
import PageP from "components/PageP"
import PageContent from "components/PageContent"
import useMetaMask from "hooks/useMetaMask"

interface Props {
  account: string
  nextStep: () => void
}

const BModule1: React.FC<Props> = ({ nextStep }) => {
  const { connect, walletInstalled, isConnected } = useMetaMask()

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
        <Button onClick={connect}>Connect my wallet</Button>
      </Card>
    )
  }

  const renderMetaMaskConnected = () => {
    return (
      <>
        <Card className="border border-green-300">
          <h3 className="text-xl mb-4 font-bold">Sweet!</h3>
          <p className="text-lg">
            You are now connected with your MetaMask wallet and ready to start
            your adventure.
          </p>
        </Card>
        <Spacer />
        <Button onClick={nextStep}>Continue</Button>
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

export default BModule1
