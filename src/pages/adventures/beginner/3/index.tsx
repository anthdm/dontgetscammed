import Button from "components/Button"
import { ErrorCard } from "components/Card"
import Input from "components/Input"
import PageContent from "components/PageContent"
import PageTitle from "components/PageTitle"
import Spacer from "components/Spacer"
import { ethers } from "ethers"
import useMetaMask from "hooks/useMetaMask"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

const Page: NextPage = () => {
  const [invalidBalance, setInvalidBalance] = useState<boolean | null>(null)
  const router = useRouter()
  const { provider, account, connectWallet, isConnected } = useMetaMask()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    if (!isConnected) {
      connectWallet()
    } else {
    }
  }, [isConnected])

  // TODO: handle the error here
  const onSubmitBalance = async (data: any): Promise<void> => {
    try {
      const result = await provider?.getBalance(account)
      const _balance = ethers.utils.formatUnits(result!)
      const { balance } = data

      if (_balance === balance) {
        router.push("/adventures/beginner/4")
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
            required: true
          })}
          placeholder="enter your account balance"
        />
      </div>
      <Spacer />
      {errors.balance && (
        <>
          <ErrorCard msg="This is a required field" />
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

export default Page
