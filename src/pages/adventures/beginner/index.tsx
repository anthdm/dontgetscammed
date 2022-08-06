import Spacer from "components/Spacer"
import type { NextPage } from "next"
import useMetaMask from "hooks/useMetaMask"
import Button from "components/Button"
import Input from "components/Input"
import { useForm } from "react-hook-form"
import PageTitle from "components/PageTitle"
import { useRouter } from "next/router"
import useAddBalance from "hooks/useAddBalance"
import { useEffect } from "react"
import Card from "components/Card"
import PageP from "components/PageP"
import MetaMaskOnboarding from "@metamask/onboarding"

const Adventure: NextPage = () => {
  const router = useRouter()
  const { tx, addBalance, error } = useAddBalance()
  const { account, connectWallet, walletInstalled, isConnected } = useMetaMask()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  // useEffect(() => {
  //   if (tx) {
  //     router.push("/adventures/beginner/1")
  //   }
  // }, [tx])

  useEffect(() => {
    if (!isConnected) {
      console.log(isConnected)
      console.log(walletInstalled)
      connectWallet()
    }
  }, [])

  const onContinue = () => {
    router.push("/adventures/beginner/1")
  }

  const renderMetaMaskNotConnected = () => {
    return (
      <Card>
        <h3 className="text-xl mb-4 font-bold">Connect your wallet</h3>
        <p className="text-lg">
          We have detected that you have Metamask installed, but it is not
          connected yet. Click the button below to connect your wallet with the
          application.
        </p>
        <Spacer />
        <Button onClick={connectWallet}>Connect my wallet</Button>
      </Card>
    )
  }

  const renderMetaMaskConnected = () => {
    return (
      <>
        <Card className="border-green-300 border">
          <h3 className="text-xl mb-4 font-bold">Sweet!</h3>
          <p className="text-lg">
            You are now connected with your MetaMask wallet and ready to start
            your adventure.
          </p>
        </Card>
        <Spacer />
        <Button onClick={handleSubmit(onContinue)}>Continue</Button>
        {/* <p className="text-lg">
          Task: find the address of you wallet and enter it in the input below
        </p> */}
        <Spacer />
        {/* <div className="w-full">
          <Input
            {...register("address", {
              validate: equalAddress
            })}
            placeholder="enter your wallet address"
          />
        </div> */}
        {/* <Spacer />
        <Button onClick={handleSubmit(onSubmitAddress)}>Continue</Button>
        <Spacer /> */}
        {error && (
          <Card error={true}>
            <h3 className="text-xl mb-4 font-bold">Whoops!</h3>
            <p className="text-lg">
              An unexpected error occured. Please contact @anthdm for further
              support.
            </p>
          </Card>
        )}
        {errors.address && (
          <Card error={true}>
            <h3 className="text-xl mb-4 font-bold">Whoops!</h3>
            <p className="text-lg">
              The address you entered does not seem to match. Maybe try to open
              the MetaMask browser extension? You can find it in the top right
              corner.
            </p>
          </Card>
        )}
      </>
    )
  }

  const renderMetaMaskNotInstalled = () => {
    return (
      <Card>
        <h3 className="text-xl mb-4 font-bold">MetaMask not installed</h3>
        <p className="text-lg">Please install Metamask to continue.</p>
      </Card>
    )
  }

  const equalAddress = (address: string): boolean => {
    return address.toLowerCase() === account
  }

  const onSubmitAddress = (data: any): void => {
    const { address } = data
    addBalance(address)
  }

  return (
    <div className="w-2/3">
      <PageTitle>Create your wallet</PageTitle>
      <PageP>
        To enter the world of cryptocurrencies, you must have a wallet first.
        Think about a wallet as a bank account, but decentralized. It will be
        your bread and butter to interact with the blockchain network.
      </PageP>
      <Spacer />
      {!walletInstalled && renderMetaMaskNotInstalled()}
      {!isConnected && walletInstalled && renderMetaMaskNotConnected()}
      {isConnected && renderMetaMaskConnected()}
    </div>
  )
}

export default Adventure
