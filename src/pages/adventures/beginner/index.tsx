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

const Adventure: NextPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const { account, chainId } = useEthereum()
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

  if (account && chainId !== "ddd") {
    return <div>not the correct chain id</div>
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
    </>
  )
}

export default Adventure
