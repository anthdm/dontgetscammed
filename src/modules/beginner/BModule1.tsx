import Button from "components/Button"
import PageTitle from "components/PageTitle"
import Spacer from "components/Spacer"
import Card, { CardP, CardTitle } from "components/Card"
import PageP from "components/PageP"
import PageContent from "components/PageContent"
import useEthereum from "hooks/useEthereum"
import ConnectAccount from "components/ConnectAccount"
import { emitSaEvent } from "utils/util"

interface Props {
  nextStep: (points: number) => void
}

const BModule1: React.FC<Props> = ({ nextStep }) => {
  const { account } = useEthereum()

  const onContinue = () => {
    emitSaEvent("new_account")
    nextStep(0)
  }

  const renderMetaMaskConnected = () => {
    return (
      <>
        <Card className="border border-green-300">
          <CardTitle>Sweet!</CardTitle>
          <CardP>
            You have now connected your wallet to the{" "}
            <span className="text-blue-400">
              dontgetscammed private network
            </span>{" "}
            and ready to start your adventures.
          </CardP>
        </Card>
        <Spacer />
        <Button onClick={onContinue}>Continue</Button>
      </>
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
      {!account && <ConnectAccount />}
      {account && renderMetaMaskConnected()}
    </PageContent>
  )
}

export default BModule1
