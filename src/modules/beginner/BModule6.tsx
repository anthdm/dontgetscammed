import Button from "components/Button"
import Card from "components/Card"
import PageContent from "components/PageContent"
import PageP, { P } from "components/PageP"
import PageTitle from "components/PageTitle"
import Spacer from "components/Spacer"
import { ethers } from "ethers"
import useAddBalance from "hooks/useAddBalance"
import useEthereum from "hooks/useEthereum"
import { useEffect, useState } from "react"

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

  const continueButton = () => {
    return <Button onClick={() => nextStep()}>Continue</Button>
  }

  const renderSuccess = () => {
    return (
      <>
        <Card className="border border-green-400">
          <P customClass="text-blue-100 text-xl">Well done!</P>
          <Spacer />
          <P customClass="text-blue-50">
            You noticed a potential scam. Always look what you are signing and
            never trust any application, even not popular ones.
          </P>
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
          <P customClass="text-blue-100 text-bold text-xl">
            You just got scammed!
          </P>
          <Spacer />
          <P customClass="text-blue-50">You did not..</P>
        </Card>
        <Spacer />
        {continueButton()}
      </>
    )
  }

  return (
    <PageContent>
      <PageTitle>Sending Ether 2</PageTitle>
      <PageP>
        Applications you visit can also send funds for you. If you approve the
        transaction they made for you ofcourse.
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
