import Button from "components/Button"
import Card from "components/Card"
import PageContent from "components/PageContent"
import PageTitle from "components/PageTitle"
import Spacer from "components/Spacer"
import useMetaMask from "hooks/useMetaMask"
import { NextPage } from "next"
import { useEffect } from "react"

const Page: NextPage = () => {
  const { connectWallet, isConnected } = useMetaMask()

  const onContinue = () => {
    alert("hello")
  }

  useEffect(() => {
    if (!isConnected) {
      connectWallet()
    }
  }, [])

  return (
    <PageContent>
      <PageTitle>Sending Ether</PageTitle>
      <p className="text-lg text-neutral-400">
        An experienced crypto user should be able to transfer currency to
        another account. Therefore, we listed two account addresses that will
        each have a specific result when they receive Ether. Could you send any
        arbitrary amount to one of those addresses?
      </p>
      <Spacer />
      <p className="text-lg mb-8 text-blue-500">
        Task: sent any arbitrary amount to one of the accounts listed below.
      </p>
      <Card>
        <h3 className="text-xl mb-4 font-bold">Alice</h3>
        <p className="text-lg">
          When Alice receives currency on her account, she will sent back DOUBLE
          the amount. Go grab your chance to make a quick profit.
        </p>
        <Spacer />
        <p className="text-lg">
          address: 0x2d12d6991824d4b7035c122abeb4fa32211694b1
        </p>
      </Card>
      <Spacer />
      <Card>
        <h3 className="text-xl mb-4 font-bold">Bob</h3>
        <p className="text-lg">
          Bob will be very thankfull when he receives your donation!
        </p>
        <Spacer />
        <p className="text-lg">
          address: 0x2d12d6991824d4b7035c122abeb4fa32211694b1
        </p>
      </Card>
      <Spacer />
      <Button onClick={onContinue}>Continue</Button>
    </PageContent>
  )
}

export default Page
