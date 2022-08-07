import Button from "components/Button"
import Card, { ErrorCard } from "components/Card"
import PageContent from "components/PageContent"
import PageTitle from "components/PageTitle"
import Spacer from "components/Spacer"
import { ethers } from "ethers"
import useMetaMask from "hooks/useMetaMask"
import { NextPage } from "next"
import { Router, useRouter } from "next/router"
import { useEffect, useState } from "react"

const ALICE = "0x212F9787A4f26d5aE5948B089dAde5BCA1182404"
const BOB = "0x112ba38B875BfE7C6Efb52c20FEAE8E6A9FE43F0"

const Page: NextPage = () => {
  const router = useRouter()
  const { provider, account, connectWallet, isConnected } = useMetaMask()
  const [isAlice, setIsAlice] = useState(false)
  const [isBob, setIsBob] = useState(false)
  const renderButton = isAlice || isBob

  const onContinue = async () => {
    await registerCallback()
  }

  const onContinueNextPage = () => {
    router.push("/")
  }

  const registerCallback = async () => {
    try {
      const blockNumber = await provider?.getBlockNumber()

      for (let i = 0; i < blockNumber! + 1; i++) {
        const block = await provider?.getBlockWithTransactions(i)
        const txs = block?.transactions.filter(
          (tx) => tx.from.toLowerCase() === account
        )

        txs?.forEach((tx) => {
          if (tx.to === ALICE) {
            setIsAlice(true)
          } else if (tx.to === BOB) {
            setIsBob(true)
          } else {
            console.log("not yet sent to both")
          }
        })

        console.log(txs)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const renderAddresses = () => {
    return (
      <>
        <Card>
          <h3 className="text-xl mb-4 font-bold">Alice</h3>
          <p className="text-lg">
            When Alice receives currency on her account, she will sent back
            DOUBLE the amount. Go grab your chance to make a quick profit.
          </p>
          <Spacer />
          <p className="text-lg">address: {ALICE}</p>
        </Card>
        <Spacer />
        <Card>
          <h3 className="text-xl mb-4 font-bold">Bob</h3>
          <p className="text-lg">
            Bob will be very thankfull when he receives your donation!
          </p>
          <Spacer />
          <p className="text-lg">address: {BOB}</p>
        </Card>
        <Spacer />
        <Button onClick={onContinue}>Continue</Button>
      </>
    )
  }

  const renderBob = () => {
    return (
      <>
        <Card className="border-green-300 border">
          <h3 className="text-xl mb-4 font-bold">Good job!</h3>
          <p className="text-lg">Bob thanks you for your generous donation!</p>
        </Card>
      </>
    )
  }

  const renderAlice = () => {
    return (
      <Card className="border border-red-500 mt-8">
        <h3 className="text-xl mb-4 font-bold">
          Whoops, you just got scammed!
        </h3>
        <p className="text-lg">
          You just sent money to Alice who promised you to sent back double the
          amount. Remember, never trust people you don't know in this space.
          especially not who promises you to double your money for free.
        </p>
      </Card>
    )
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
      {!isAlice && !isBob && renderAddresses()}
      {isAlice && renderAlice()}
      {isBob && renderBob()}
      {renderButton && (
        <>
          <Spacer />
          <Button onClick={onContinueNextPage}>Continue</Button>
        </>
      )}
      <Spacer />
    </PageContent>
  )
}

export default Page
