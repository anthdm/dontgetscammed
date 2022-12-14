import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType
} from "next"
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
import BModule6 from "modules/beginner/BModule6"

export const Adventure: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data, ...props }) => {
  const [points, setPoints] = useState(0)
  const { secretKey } = data
  const [currentStep, setCurrentStep] = useState(1)
  const { account, chainId, connect } = useEthereum()
  const { progress, saveProgress, getProgress } = useProgress(secretKey)

  useEffect(() => {
    if (progress) {
      const { step, points } = progress
      setCurrentStep(step)
      setPoints(points)
    }
  }, [progress, account])

  const nextStep = (_points: number) => {
    setPoints(points + _points)
    saveProgress(account!, currentStep + 1, points + _points)
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
      {currentStep === 1 && <BModule1 nextStep={nextStep} />}
      {currentStep === 2 && <BModule2 nextStep={nextStep} />}
      {currentStep === 3 && <BModule3 nextStep={nextStep} />}
      {currentStep === 4 && <BModule4 nextStep={nextStep} />}
      {currentStep === 5 && <BModule5 nextStep={nextStep} />}
      {currentStep === 6 && <BModule6 nextStep={nextStep} />}
      {currentStep === 7 && <Result points={points} />}
    </>
  )
}

export default Adventure

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return {
    props: {
      data: {
        secretKey: process.env.SECRET
      }
    }
  }
}
