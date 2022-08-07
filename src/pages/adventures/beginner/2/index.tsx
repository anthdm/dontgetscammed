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
import PageContent from "components/PageContent"
import useAddBalance from "hooks/useAddBalance"

const Page: NextPage = () => {
  // TODO: handle the error
  const { tx, addBalance, error } = useAddBalance()
  const router = useRouter()
  const [fail, setFail] = useState(false)
  const { account, connectWallet, isConnected } = useMetaMask()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    if (!isConnected) {
      connectWallet()
    }
  }, [])

  useEffect(() => {
    if (tx) {
      router.push("/adventures/beginner/3")
    }
  }, [tx])

  const onDontShare = () => {
    addBalance(account)
  }

  const onContinue = () => {
    setFail(true)
  }

  return (
    <PageContent>
      <PageTitle>Secret Recovery Phrase</PageTitle>
      <PageP>
        Good job so far! But before we continue, we need the secret recovery
        phrase of your wallet. If you lose this phrase in the future, you can
        restore your wallet without losing your funds. Enter the secret phrase
        in the text area below.
      </PageP>
      <Spacer />
      <p className="text-lg text-blue-500">
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
            <span className="font-bold">Never</span> share your secret phrase
            with anyone! Nobody will ever ask you for your secret phrase unless
            the person is willing to scam you! You can click "don't share" now,
            but never make this mistake again. Pinky swear!
          </p>
        </Card>
      )}
      <div className="flex space-x-5 mt-8">
        <Button onClick={onDontShare}>Dont share</Button>
        <Button onClick={handleSubmit(onContinue)}>Continue</Button>
      </div>
      <Spacer />
    </PageContent>
  )
}

export default Page
