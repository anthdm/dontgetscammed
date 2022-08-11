import Button from "components/Button"
import Card from "components/Card"
import PageP from "components/PageP"
import PageTitle from "components/PageTitle"
import Spacer from "components/Spacer"
import { NextPage } from "next"
import Link from "next/link"

interface Props {}

const AdventureCard: React.FC<Props> = () => {
  return (
    <Card className="flex flex-col justify-between">
      <h3 className="text-xl mb-3 text-green-400">Beginner</h3>
      <PageP>
        Onboard the world of cryptocurrencies and learn about wallets, sending
        and receiving currency. But, watch out dont get scammed!
      </PageP>
      <Spacer />
      <Link href="/adventures/beginner">
        <Button className="w-full">Start adventure</Button>
      </Link>
    </Card>
  )
}

const Page: NextPage = () => {
  return (
    <>
      <PageTitle>Select your adventure</PageTitle>
      <PageP>
        All adventures are run in an isolated environment that simulates a real
        Ethereum network.
      </PageP>
      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 mt-10">
        <Card className="flex flex-col justify-between">
          <div>
            <h3 className="text-xl mb-4 text-green-400">Beginner</h3>
            <PageP>
              Onboard the world of cryptocurrencies and learn everything about a
              wallet. Send and receive currency will be your main tasks. But
              watch out, don&apos;t get scammed!
            </PageP>
          </div>
          <Spacer />
          <Link href="/adventures/beginner">
            <Button className="w-full">Start adventure</Button>
          </Link>
        </Card>
        <Card className="flex flex-col justify-between">
          <div>
            <h3 className="text-xl mb-4 text-orange-400">Advanced</h3>
            <PageP>
              Interact with smart contracts and learn about tokens, NFTs, and
              allowances. Take care; we will do everything to scam you!
            </PageP>
          </div>
          <Spacer />
          <Button className="w-full bg-muted" isDisabled={true}>
            Coming soon
          </Button>
        </Card>
        <Card className="flex flex-col justify-between">
          <div>
            <h3 className="text-xl mb-4 text-red-600">Expert</h3>
            <PageP>
              So, you think you are a crypto expert? I will do everything to
              drain your wallet! Or will you drain mine?
            </PageP>
          </div>
          <Spacer />
          <Button className="w-full bg-muted" isDisabled={true}>
            Coming soon
          </Button>
        </Card>
      </div>
    </>
  )
}

export default Page
