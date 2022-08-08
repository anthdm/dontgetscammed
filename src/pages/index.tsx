import PageContent from "components/PageContent"
import PageP from "components/PageP"
import Spacer from "components/Spacer"
import type { NextPage } from "next"
import Link from "next/link"

const Home: NextPage = () => {
  return (
    <div className="flex flex-col">
      <PageContent>
        <h1 className="text-3xl lg:text-5xl font-bold tracking-wide leading-tight mb-6">
          An <span className="text-blue-500">educational</span> and{" "}
          <span className="text-blue-500">interactive</span> platform that
          prepares you to enter the world of{" "}
          <span className="text-blue-500">cryptocurrencies</span>
        </h1>
        <PageP>
          This fantastic piece of technology is changing the world as we know
          it. But everything comes at a cost. Crypto, as of today, has a
          significant layer of complexity that malicious people are trying to
          take advantage of by fooling you into a scam with the loss of your
          funds as a result.
        </PageP>
        <Spacer />
        <PageP>
          That's why I made this interactive application where you will learn
          everything about interacting with cryptocurrencies in an isolated
          environment. Discover adventures from beginner to expert, but watch
          out, don't get scammed!
        </PageP>
      </PageContent>
      <div className="mt-10">
        <h2 className="text-2xl mb-6">
          Are you ready to start your adventure?
        </h2>
        <Link href="/adventures">
          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-4 rounded-xl font-bold">
            Yes! I will take the blue pill
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
