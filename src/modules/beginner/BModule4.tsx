import Button from "components/Button"
import { ErrorCard } from "components/Card"
import Input from "components/Input"
import PageContent from "components/PageContent"
import PageTitle from "components/PageTitle"
import PageP from "components/PageP"
import Spacer from "components/Spacer"
import { ethers } from "ethers"
import { useState } from "react"
import { useForm } from "react-hook-form"
import useEthereum from "hooks/useEthereum"

interface Props {
  account: string
  nextStep: () => void
}

const BModule3: React.FC<Props> = ({ nextStep, account }) => {
  const [invalidBalance, setInvalidBalance] = useState<boolean | null>(null)
  const { provider } = useEthereum()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  // TODO: handle the error here
  const onSubmitBalance = async (data: any): Promise<void> => {
    try {
      const result = await provider?.getBalance(account)
      const _balance = ethers.utils.formatUnits(result!)
      const amount = (+_balance).toFixed(1)
      const { balance } = data
      const balanceConverted = Number(balance).toFixed(1)

      if (amount === balanceConverted) {
        nextStep()
      } else {
        setInvalidBalance(true)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <PageContent>
      <PageTitle>Account balance</PageTitle>
      <PageP>
        To send Ether, you must have a balance in your wallet. Luckily we got
        you covered. We added some balance to your account. Could you go check
        it out?
      </PageP>
      <Spacer />
      <p className="font-bold text-lg mb-8 text-blue-500 mb-2">
        Task: check the balance of your account and enter it in the input field
        below.
      </p>
      <p className="font-bold text-lg text-green-400">Reward: 1 point</p>
      <Spacer />
      <div className="w-full">
        <Input
          {...register("balance", {
            required: true
          })}
          placeholder="enter your account balance"
        />
      </div>
      <Spacer />
      {errors.balance && (
        <>
          <ErrorCard msg="This is a required field" />
          <Spacer />
        </>
      )}
      {invalidBalance && (
        <>
          <ErrorCard
            title="Whoops!"
            msg="It seems that the balance you've entered does not match"
          />
          <Spacer />
        </>
      )}
      <Button onClick={handleSubmit(onSubmitBalance)}>Continue</Button>
    </PageContent>
  )
}

export default BModule3
