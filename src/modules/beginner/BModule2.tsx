import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import PageContent from "components/PageContent"
import PageP from "components/PageP"
import Spacer from "components/Spacer"
import Input from "components/Input"
import Button from "components/Button"
import Card from "components/Card"
import PageTitle from "components/PageTitle"
import useAddBalance from "hooks/useAddBalance"

interface Props {
  account: string
  nextStep: () => void
}

const BModule2: React.FC<Props> = ({ account, nextStep }) => {
  const { addBalance, tx } = useAddBalance()
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

  const equalAddress = (address: string): boolean => {
    console.log(account)
    return address.toLowerCase() === account
  }

  const onContinue = (data: any): void => {
    const { address } = data
    addBalance(address)
  }

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
      <p className="font-bold text-lg text-blue-500">
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

export default BModule2
