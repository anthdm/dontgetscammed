import Button from "components/Button"
import Card, { CardP, CardTitle } from "components/Card"
import PageContent from "components/PageContent"
import PageP, { P } from "components/PageP"
import PageTitle from "components/PageTitle"
import Spacer from "components/Spacer"
import { ethers } from "ethers"
import useAddBalance from "hooks/useAddBalance"
import useEthereum from "hooks/useEthereum"
import { useEffect, useState } from "react"
import { emitSaEvent } from "utils/util"

interface Props {
  nextStep: () => void
}

const BModule6: React.FC<Props> = ({ nextStep }) => {
  const { signer, account } = useEthereum()
  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState(false)
  const { addBalance } = useAddBalance()

  useEffect(() => {
    addBalance(account!)
  }, [])

  const onTransfer = async () => {
    try {
      await signer?.sendTransaction({
        to: "0x7d8b83DB9Ca98b6db63cFcf93547F5B7FbcD346b",
        from: await signer.getAddress(),
        value: ethers.utils.parseEther("0.2")
      })
      setFail(true)
    } catch (e: any) {
      if (e.code === 4001) {
        setSuccess(true)
      } else {
        console.log(e)
      }
    }
  }

  const onContinue = () => {
    emitSaEvent("beginner_complete")
    nextStep()
  }

  const continueButton = () => {
    return <Button onClick={onContinue}>Continue</Button>
  }

  const renderSuccess = () => {
    return (
      <>
        <Card className="border border-green-400">
          <CardTitle>Well done!</CardTitle>
          <CardP>
            You noticed a potential scam. Always look what you are signing and
            never trust any application, even not popular ones.
          </CardP>
        </Card>
        <Spacer />
        {continueButton()}
      </>
    )
  }

  const renderFail = () => {
    return (
      <>
        <Card error>
          <CardTitle>You just got scammed!</CardTitle>
          <CardP>
            We just took 0.2 ETH instead of the 0.1 ETH we told you. Always
            verify your transaction in your wallet before accepting (signing)
            it.
          </CardP>
          <Spacer />
          <p className="font-bold text-lg text-red-500">penalty 3 points</p>
        </Card>
        <Spacer />
        {continueButton()}
      </>
    )
  }

  return (
    <PageContent>
      <PageTitle>Signing transactions</PageTitle>
      <PageP>
        You do not always have to transfer currency manually. Most applications
        will transfer your funds if you sign the transaction they made for you.
        Give it a shot.
      </PageP>
      <Spacer />
      <P customClass="font-bold mb-2" primary>
        Task: send 0.1 ETH by clicking the button below and approve the
        transaction in your wallet
      </P>
      <PageP className="font-bold text-green-400">Reward: 4 points</PageP>
      <Spacer />
      {!success && !fail && (
        <Button onClick={onTransfer}>Transfer 0.1 ETH</Button>
      )}
      {success && renderSuccess()}
      {fail && !success && renderFail()}
    </PageContent>
  )
}

export default BModule6
