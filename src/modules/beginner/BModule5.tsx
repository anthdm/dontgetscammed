import Button from "components/Button"
import Card from "components/Card"
import PageContent from "components/PageContent"
import PageP from "components/PageP"
import PageTitle from "components/PageTitle"
import Spacer from "components/Spacer"
import useEthereum from "hooks/useEthereum"
import { useState } from "react"

const ALICE = "0x212F9787A4f26d5aE5948B089dAde5BCA1182404"
const BOB = "0x112ba38B875BfE7C6Efb52c20FEAE8E6A9FE43F0"

interface Props {
  nextStep: () => void
}
const BModule4: React.FC<Props> = ({ nextStep }) => {
  const { provider, account } = useEthereum()
  const [isAlice, setIsAlice] = useState(false)
  const [isBob, setIsBob] = useState(false)
  const renderButton = isAlice || isBob
  const [noTx, setNoTx] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onContinue = async () => {
    setIsLoading(true)
    await checkTxs()
    setIsLoading(false)
  }

  const onContinueNextPage = () => {
    nextStep()
  }

  // TODO: A better aproach is here to store the blocknumber from when this address is first seen
  // on the application. That should save some iterations for sure.
  const checkTxs = async () => {
    try {
      const blockNumber = await provider?.getBlockNumber()

      for (let i = 0; i < blockNumber! + 1; i++) {
        const block = await provider?.getBlockWithTransactions(i)
        const txs = block?.transactions.filter(
          (tx) => tx.from.toLowerCase() === account
        )

        if (txs?.length === 0) {
          setNoTx(true)
        }

        txs?.forEach((tx) => {
          if (tx.to === ALICE) {
            setIsAlice(true)
            setNoTx(false)
          } else if (tx.to === BOB) {
            setIsBob(true)
            setNoTx(false)
          }
        })
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
          <p className="text-lg mb-2">
            When Alice receives currency on her account, she will sent back
            DOUBLE the amount. Go grab your chance to make a quick profit.
          </p>
          <p className="font-bold text-lg text-green-400">Reward: 6 points</p>
          <Spacer />
          <p className="text-xs lg:text-lg">address: {ALICE}</p>
        </Card>
        <Spacer />
        <Card>
          <h3 className="text-xl mb-4 font-bold">Bob</h3>
          <p className="text-lg mb-2">
            Bob will be very thankfull when he receives your donation!
          </p>
          <p className="font-bold text-lg text-green-400">Reward: 3 points</p>
          <Spacer />
          <p className="text-xs lg:text-lg">address: {BOB}</p>
        </Card>
        {noTx && renderNoTx()}
        <Spacer />
        <Button loading={isLoading} onClick={onContinue}>
          Continue
        </Button>
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

  const renderNoTx = () => {
    return (
      <Card className="mt-8 border border-red-500">
        <h3 className="text-xl mb-4 font-bold">
          Could not find any transaction to Bob or Alice.
        </h3>
        <p className="text-lg">
          It could be that your transaction is still in progress. Try again in 1
          minute or so.
        </p>
      </Card>
    )
  }

  const renderAlice = () => {
    return (
      <Card className="border border-red-500 mt-8">
        <h3 className="text-xl mb-4 font-bold">
          Whoops, you just got scammed!
        </h3>
        <p className="text-lg">
          You just sent money to Alice, who promised to send back double the
          amount. Remember, never trust people you don&apos;t know in this
          space—especially not those who promise you to double your money for
          free.
        </p>
        <Spacer />
        <p className="font-bold text-lg text-red-500">penalty 3 points</p>
      </Card>
    )
  }

  return (
    <PageContent>
      <PageTitle>Sending Ether</PageTitle>
      <PageP>
        An experienced crypto user should be able to transfer currency to
        another account. Therefore, we listed two account addresses that will
        each have a specific result when they receive Ether. Could you send any
        arbitrary amount to one of those addresses?
      </PageP>
      <Spacer />
      <p className="font-bold text-lg mb-8 text-blue-500">
        Task: sent any arbitrary amount to one of the accounts listed below.
      </p>
      <Spacer />
      {!isAlice && !isBob && renderAddresses()}
      {isAlice && renderAlice()}
      {isBob && renderBob()}
      {renderButton && (
        <>
          <Spacer />
          <Button onClick={onContinueNextPage}>Continue</Button>
        </>
      )}
    </PageContent>
  )
}

export default BModule4
