import type { NextPage } from "next"
import useMetaMask from "hooks/useMetaMask"
import { useEffect, useState } from "react"
import BModule1 from "modules/beginner/BModule1"
import BModule2 from "modules/beginner/BModule2"
import BModule3 from "modules/beginner/BModule3"
import BModule4 from "modules/beginner/BModule4"
import BModule5 from "modules/beginner/BModule5"
import useProgress from "hooks/useProgress"

const Adventure: NextPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const { isConnected, connectWallet, account, provider } = useMetaMask()
  const { progress, getProgress } = useProgress()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (progress.step !== currentStep) {
      setCurrentStep(3)
      setIsLoading(false)
    }
  }, [progress])

  useEffect(() => {
    if (!isConnected) {
      connectWallet()
    } else {
      getProgress(account)
    }
  }, [isConnected])

  const nextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  // TODO: make the loader cleaner
  if (isLoading) {
    return <>loading....</>
  }

  return (
    <>
      {currentStep === 1 && <BModule1 account={account} nextStep={nextStep} />}
      {currentStep === 2 && <BModule2 account={account} nextStep={nextStep} />}
      {currentStep === 3 && <BModule3 account={account} nextStep={nextStep} />}
      {currentStep === 4 && <BModule4 account={account} nextStep={nextStep} />}
      {currentStep === 5 && <BModule5 account={account} nextStep={nextStep} />}
    </>
  )
}

export default Adventure
