import Button from "components/Button"
import Card from "components/Card"
import Input from "components/Input"
import PageTitle from "components/PageTitle"
import Spacer from "components/Spacer"
import useMetaMask from "hooks/useMetaMask"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

const Page: NextPage = () => {
  const router = useRouter()
  const { balance, getBalance, connect, isConnected } = useMetaMask()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    if (!isConnected) {
      connect()
    } else {
      getBalance()
    }
  })

  const onSubmitBalance = (data: any): void => {
    router.push("/adventures/beginner/3")
  }

  const equalBalance = (amount: string): boolean => {
    return amount === balance
  }

  return (
    <div className="w-2/3">
      <PageTitle>Account balance</PageTitle>
      <p className="text-lg text-neutral-400">
        In order to sent Ether you will need to have some balance on your
        wallet. Luckely we got you covered. We added some balance to your
        account. Go check it out!
      </p>
      <Spacer />
      <p className="text-lg mb-8">
        Task: check the balance of your account and enter it in the input field
        below.
      </p>
      <div className="flex flex-row space-x-4">
        <div className="w-2/3">
          <Input
            {...register("balance", {
              required: true,
              validate: equalBalance
            })}
            placeholder="enter your account balance"
          />
        </div>
        <Button onClick={handleSubmit(onSubmitBalance)}>Submit</Button>
      </div>
      {errors.balance && (
        <Card error={true} className="mt-6">
          <h3 className="text-xl mb-4 font-bold ">Whoops!</h3>
          <p className="text-lg">
            It seems that the balance you've entered does not match.
          </p>
        </Card>
      )}
    </div>
  )
}

export default Page
