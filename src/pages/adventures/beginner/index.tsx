import type { NextPage } from "next"
import { useEffect, useState } from "react"
import BModule1 from "modules/beginner/BModule1"
import BModule2 from "modules/beginner/BModule2"
import BModule3 from "modules/beginner/BModule3"
import BModule4 from "modules/beginner/BModule4"
import BModule5 from "modules/beginner/BModule5"
import useProgress from "hooks/useProgress"
import useEthereum from "hooks/useEthereum"
import ConnectAccount from "components/ConnectAccount"
import Result from "modules/beginner/Result"
import Card from "components/Card"
import PageContent from "components/PageContent"
import Spacer from "components/Spacer"
import Button from "components/Button"

const Adventure: NextPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const { account, chainId, connect } = useEthereum()
  const { progress, saveProgress } = useProgress()

  useEffect(() => {
    if (progress) {
      setCurrentStep(progress.step)
    }
  }, [progress])

  const nextStep = () => {
    saveProgress(account!, currentStep + 1)
    setCurrentStep(currentStep + 1)
  }

  const dsgChainId = Number(process.env.chainId)
  if (account && chainId !== dsgChainId) {
    return (
      <PageContent>
        <Card className="border border-orange-400">
          <h3 className="text-xl mb-4 font-bold">Invalid network</h3>
          <p className="text-lg">
            You are currently not connected to the dontgetscammed network.
          </p>
          <Spacer />
          <p className="text-lg">
            Your are currently connected to network: {chainId}
          </p>
          <Spacer />
          <Button onClick={connect}>Connect to DGS network</Button>
        </Card>
      </PageContent>
    )
  }

  if (!account) {
    return <ConnectAccount />
  }

  return (
    <>
      {currentStep === 1 && <BModule1 account={account} nextStep={nextStep} />}
      {currentStep === 2 && <BModule2 account={account} nextStep={nextStep} />}
      {currentStep === 3 && <BModule3 account={account} nextStep={nextStep} />}
      {currentStep === 4 && <BModule4 account={account} nextStep={nextStep} />}
      {currentStep === 5 && <BModule5 nextStep={nextStep} />}
      {currentStep === 6 && <Result />}
    </>
  )
}

export default Adventure
