import Button from "components/Button"
import Card from "components/Card"
import PageTitle from "components/PageTitle"
import Spacer from "components/Spacer"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import PageP from "components/PageP"
import PageContent from "components/PageContent"
import useAddBalance from "hooks/useAddBalance"

interface Props {
  account: string
  nextStep: () => void
}

const BModule3: React.FC<Props> = ({ nextStep, account }) => {
  // TODO: handle the error
  const { tx, addBalance, error, isLoading } = useAddBalance()
  const [fail, setFail] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    if (tx) {
      nextStep()
    }
  }, [tx])

  const onDontShare = () => {
    console.log("adding balance")
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
      <p className="font-bold text-lg text-blue-500 mb-2">
        Task: enter your secret recovery phrase in the input field below
      </p>
      <p className="font-bold text-lg text-green-400">Reward: 2 points</p>
      <Spacer />
      <div className="">
        <textarea
          {...register("secret", { required: true })}
          className="w-full bg-black-dimmed rounded-xl px-4 py-6"
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
            the person is willing to scam you! You can click don&apos;t share
            now, but never make this mistake again. Pinky swear!
          </p>
        </Card>
      )}
      <Spacer />
      <div className="flex space-x-5 mt-8">
        <div>
          <Button loading={isLoading} onClick={onDontShare}>
            Dont share
          </Button>
        </div>
        <div>
          <Button onClick={handleSubmit(onContinue)}>Continue</Button>
        </div>
      </div>
    </PageContent>
  )
}

export default BModule3
