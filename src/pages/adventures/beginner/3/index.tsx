import Button from "components/Button"
import Card from "components/Card"
import PageTitle from "components/PageTitle"
import Spacer from "components/Spacer"
import useMetaMask from "hooks/useMetaMask"
import { NextPage } from "next"
import { useEffect } from "react"

const Page: NextPage = () => {
  const { connect, isConnected } = useMetaMask()
  const onClickReady = () => {
    alert("hello")
  }

  useEffect(() => {
    if (!isConnected) {
      connect()
    }
  })

  return (
    <div className="w-1/2">
      <PageTitle>Sending Ether</PageTitle>
      <p className="text-lg text-neutral-400">
        An experienced crypto user should be able to tranfer Ether to other
        wallets. Can you transfer Ether to another wallet?
      </p>
      <Spacer />
      <p className="text-lg mb-8">
        Task: sent 0.1 Ether to the following recipient address.
      </p>
      <Card>0x2d12d6991824d4b7035c122abeb4fa32211694b1</Card>
      <Spacer />
      <Button onClick={onClickReady}>Continue</Button>
    </div>
  )
}

export default Page
