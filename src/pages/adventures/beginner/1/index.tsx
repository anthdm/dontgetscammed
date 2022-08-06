import Button from "components/Button"
import Card from "components/Card"
import Input from "components/Input"
import PageContent from "components/PageContent"
import PageP from "components/PageP"
import PageTitle from "components/PageTitle"
import Spacer from "components/Spacer"
import useAddBalance from "hooks/useAddBalance"
import useMetaMask from "hooks/useMetaMask"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

const Page: NextPage = () => {
  const router = useRouter()
  const { account, isConnected, connectWallet } = useMetaMask()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const equalAddress = (address: string): boolean => {
    return address.toLowerCase() === account
  }
  const onContinue = (data: any): void => {
    const { address } = data
    // addBalance(address)
    router.push("/adventures/beginner/2")
  }

  useEffect(() => {
    if (!isConnected) {
      connectWallet()
    }
  }, [])

  return (
    <PageContent>
      <PageTitle>Account address</PageTitle>
      <PageP>
        To receive currency in your wallet account, you must know its address
        first. Think about a wallet address the same way as your bank account
        number. Then, you can give it to someone else so they can send you
        money.
      </PageP>
      <Spacer />
      <p className="text-lg text-blue-500">
        Task: find the address of you wallet and enter it in the input below
      </p>
      <Spacer />
      <div className="w-full">
        <Input
          {...register("address", {
            validate: equalAddress
          })}
          placeholder="enter your wallet address"
        />
      </div>
      <Spacer />
      {errors.address && (
        <>
          <Card error={true}>
            <h3 className="text-xl mb-4 font-bold">Whoops!</h3>
            <p className="text-lg">
              The address you entered does not seem to match. Maybe try to open
              the MetaMask browser extension? Normally, you can find it in the
              top right corner of your browser.
            </p>
          </Card>
          <Spacer />
        </>
      )}
      <Button onClick={handleSubmit(onContinue)}>Continue</Button>
      <Spacer />
    </PageContent>
  )
}

export default Page
