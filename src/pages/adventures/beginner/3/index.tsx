import Button from "components/Button"
import Card from "components/Card"
import Input from "components/Input"
import PageContent from "components/PageContent"
import PageTitle from "components/PageTitle"
import Spacer from "components/Spacer"
import useMetaMask from "hooks/useMetaMask"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

const Page: NextPage = () => {
  const router = useRouter()
  const { balance, getBalance, connectWallet, isConnected } = useMetaMask()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    if (!isConnected) {
      connectWallet()
    } else {
      getBalance()
    }
  }, [isConnected])

  const onSubmitBalance = (data: any): void => {
    router.push("/adventures/beginner/4")
  }

  const equalBalance = (amount: string): boolean => {
    console.log("balance")
    console.log(balance)
    console.log("amount")
    console.log(amount)
    return amount === balance
  }

  return (
    <PageContent>
      <PageTitle>Account balance</PageTitle>
      <p className="text-lg text-neutral-400">
        To send Ether, you must have a balance in your wallet. Luckily we got
        you covered. We added some balance to your account. Could you go check
        it out?
      </p>
      <Spacer />
      <p className="text-lg mb-8 text-blue-500">
        Task: check the balance of your account and enter it in the input field
        below.
      </p>
      <div className="w-full">
        <Input
          {...register("balance", {
            required: true,
            validate: equalBalance
          })}
          placeholder="enter your account balance"
        />
      </div>
      <Spacer />
      {errors.balance && (
        <>
          <Card error={true} className="mt-6">
            <h3 className="text-xl mb-4 font-bold ">Whoops!</h3>
            <p className="text-lg">
              It seems that the balance you've entered does not match.
            </p>
          </Card>
          <Spacer />
        </>
      )}
      <Button onClick={handleSubmit(onSubmitBalance)}>Continue</Button>
    </PageContent>
  )
}

export default Page
