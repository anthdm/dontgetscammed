import Button from "components/Button"
import Card from "components/Card"
import PageTitle from "components/PageTitle"
import Spacer from "components/Spacer"
import useMetaMask from "hooks/useMetaMask"
import type { NextPage } from "next"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/router"
import PageP from "components/PageP"

const Page: NextPage = () => {
  const router = useRouter()
  const [fail, setFail] = useState(false)
  const { connect, isConnected } = useMetaMask()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    if (!isConnected) {
      connect()
    }
  })

  const onDontShare = () => {
    router.push("/adventures/beginner/2")
  }

  const onContinue = () => {
    setFail(true)
  }

  return (
    <div className="w-2/3">
      <PageTitle>Secret Recovery Phrase</PageTitle>
      <PageP>
        Before we continue we need the secret recovery phrase of your wallet. If
        you loose this phrase you will be able to restore your wallet without
        the loss of your funds. Enter the secret phrase in the text area below.
      </PageP>
      <Spacer />
      <p className="text-lg">
        Task: enter your secret recovery phrase in the input field below
      </p>
      <Spacer />
      <div className="flex flex-row space-x-4">
        <textarea
          {...register("secret", { required: true })}
          className="w-full bg-black-dimmed rounded-xl p-4"
        />
      </div>
      {errors.secret && (
        <p className="text-red-500 mt-2">This fields is required</p>
      )}
      {fail && (
        <Card className="border border-red-500 mt-8">
          <h3 className="text-xl mb-4 font-bold">
            Whoops, you just got scammed!
          </h3>
          <p className="text-lg">
            <span className="font-bold text-lg">Never</span> share your secret
            phrase with anyone! Nobody will ever ask you for your secret phrase
            unless the person is willing to scam you! So, press{" "}
            <span className="text-blue-400">dont share</span> and never make
            this mistake again!
          </p>
        </Card>
      )}
      <div className="flex space-x-5 mt-8">
        <Button onClick={onDontShare}>Dont share</Button>
        <Button onClick={handleSubmit(onContinue)}>Continue</Button>
      </div>
      <Spacer />
    </div>
  )
}

export default Page
