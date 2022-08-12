import Button from "components/Button"
import Card from "components/Card"
import Input from "components/Input"
import PageContent from "components/PageContent"
import PageP from "components/PageP"
import PageTitle from "components/PageTitle"
import Spacer from "components/Spacer"
import { ethers } from "ethers"
import useEthereum from "hooks/useEthereum"
import type { NextPage } from "next"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { emitSaEvent } from "utils/util"

declare let window: {
  ethereum?: any
}

const Donate: NextPage = () => {
  const [donateError, setDonateError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signer, chainId } = useEthereum()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      amount: ethers.utils.parseEther("0.1")
    }
  })

  const switchNetwork = async () => {
    try {
      const instance = window.ethereum

      await instance.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }]
      })
    } catch (e) {}
  }

  const onDonate = async (data: any) => {
    const { amount } = data

    try {
      setLoading(true)
      const _amount = ethers.utils.parseEther(amount)

      await signer?.sendTransaction({
        to: "0x7d8b83DB9Ca98b6db63cFcf93547F5B7FbcD346b",
        from: await signer.getAddress(),
        value: _amount
      })

      emitSaEvent(`dontate_${_amount}`)

      setSuccess(true)
    } catch (e: any) {
      setDonateError(e.message)
      console.log(e)
    }

    setLoading(false)
  }

  const isEthNetwork = (): boolean => {
    return chainId === Number("0x1")
  }

  const validAmount = (amount: any): boolean => {
    console.log(amount)
    try {
      const parsedAmount = ethers.utils.parseEther(amount)
      return parsedAmount.gt(0)
    } catch (e: any) {
      return false
    }
  }

  return (
    <PageContent>
      <PageTitle>Donate</PageTitle>
      <PageP>
        If you like what I&apos;m building consider supporting the project. The
        money will mostly be used to cover the operational costs. This will
        change the network back to the Ethereum mainnet.
      </PageP>
      {!isEthNetwork() && (
        <>
          <Spacer />
          <Card className="border border-orange-500">
            <p className="text-lg">
              You are currently not connected to the Ethereum mainnet. Click the
              button below to connect to the Ethereum mainnet.
            </p>
            <Spacer />
            <Button onClick={switchNetwork}>Switch network</Button>
          </Card>
        </>
      )}
      <Spacer />
      <div className="flex space-x-4">
        <div className="items-center flex">
          <div className="w-28">
            <Input
              {...register("amount", { required: true, validate: validAmount })}
              className="rounded-l-xl rounded-r-none"
            />
          </div>
          <div className="p-3 bg-gray-400 rounded-r-xl">
            <p className="text-white font-bold">ETH</p>
          </div>
        </div>
        {/* TODO: fix the loading state */}
        <Button
          isDisabled={!isEthNetwork()}
          loading={loading}
          onClick={handleSubmit(onDonate)}
        >
          Donate
        </Button>
      </div>
      {errors.amount && (
        <>
          <Spacer />
          <Card error>Please enter a valid amount</Card>
        </>
      )}
      {donateError && (
        <>
          <Spacer />
          <Card error>{donateError}</Card>
        </>
      )}
      {success && (
        <>
          <Spacer />
          <Card className="border border-green-400">
            <h3 className="text-lg font-bold mb-4">
              Thank you for your donation!
            </h3>
            <Spacer />
            <Link href="/">
              <Button>Back to homepage</Button>
            </Link>
          </Card>
        </>
      )}
    </PageContent>
  )
}

export default Donate
