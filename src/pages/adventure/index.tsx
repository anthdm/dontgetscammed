import Spacer from "components/Spacer"
import type { NextPage } from "next"
import useMetaMask from "hooks/useMetaMask"
import Button from "components/Button"
import Input from "components/Input"
import { useForm } from "react-hook-form"

const Adventure: NextPage = () => {
  const { account, connect, isConnected, hasMetaMask } = useMetaMask()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const renderMetaMaskNotConnected = () => {
    return (
      <>
        <p className="mb-4">
          We detected that you have MetaMask installed, but it is not connected
          yet. Click the button below to connected your wallet with our
          application.
        </p>
        <Button onClick={connect}>Connect my wallet</Button>
      </>
    )
  }

  const renderMetaMaskConnected = () => {
    return (
      <>
        <p className="mb-8">
          Sweet! you are now connected with your MetaMask wallet. If you want to
          receive money on your wallet you need to now its address. Find the
          address of your wallet and type it in the input below.
        </p>
        <div className="flex flex-row space-x-4">
          <div className="w-2/3">
            <Input
              {...register("address", {
                validate: equalAddress
              })}
              placeholder="enter your wallet address"
            />
          </div>
          <Button onClick={handleSubmit(onSubmitAddress)}>Lets go</Button>
        </div>
        <Spacer />
        {errors.address && (
          <div className="border border-red-400 p-4 rounded-xl text-red-400">
            Yikes! The address you entered does not seem to match
          </div>
        )}
      </>
    )
  }

  const equalAddress = (address: string): boolean => {
    return address.toLowerCase() === account
  }

  const onSubmitAddress = (data: any): void => {
    console.log(data)
  }

  return (
    <div className="">
      <div className="w-2/3">
        <h1 className="text-4xl mb-4">A new adventure awaits</h1>
        <p>
          Each crypto adventure starts with creating a new wallet. We will use
          one of the most commonly used wallets for Ethereum; Metamask.
        </p>
        <Spacer />
        {!hasMetaMask && <p>You dont have metamask installed</p>}
        {!isConnected && renderMetaMaskNotConnected()}
        {isConnected && renderMetaMaskConnected()}
      </div>
    </div>
  )
}

export default Adventure
