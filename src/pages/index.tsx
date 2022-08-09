import PageContent from "components/PageContent"
import PageP from "components/PageP"
import PageTitle from "components/PageTitle"
import Spacer from "components/Spacer"
import type { NextPage } from "next"
import Link from "next/link"
import { SocialIcon } from "react-social-icons"

const Home: NextPage = () => {
  return (
    <div className="flex flex-col">
      <PageContent>
        <h1 className="text-3xl lg:text-5xl font-bold tracking-wide mb-6">
          An <span className="text-blue-500">educational</span> and{" "}
          <span className="text-blue-500">interactive</span> platform that
          prepares you to not get scammed
        </h1>
        <p className="lg:text-xl font-bold text-muted tracking-wide">
          Enter the world of cryptocurrencies in an isolated environment where
          you earn points by completing adventures ranging from beginner to
          expert. But watch out, don't get scammed!
        </p>
      </PageContent>
      <div className="mt-10">
        <Link href="/adventures">
          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-4 rounded-xl font-bold">
            I'm ready to start my adventure
          </button>
        </Link>
      </div>
      <div className="my-10"></div>
      <PageContent>
        <PageTitle>About</PageTitle>
        <PageP>
          Blockchain is a fantastic piece of technology that is changing the
          world as we know it. But everything comes at a cost. Crypto, as of
          today, has a significant layer of complexity that malicious people are
          trying to take advantage of by fooling you into a scam with the loss
          of your funds as a result.
        </PageP>
        <Spacer />
        <PageP>
          That's why I made this interactive application where you will learn
          everything about interacting with cryptocurrencies in an isolated
          environment. Discover adventures from beginner to expert, but watch
          out, don't get scammed!
        </PageP>
      </PageContent>
      <div className="my-10"></div>
      <PageContent>
        <PageTitle>News</PageTitle>
        <PageP>- Launched test version</PageP>
        <PageP>- ETA advanced adventures and leader board September</PageP>
      </PageContent>

      <footer className="flex flex-col items-center mt-20">
        <div className="border-t border-gray-700 w-full py-10 flex flex-col space-y-6 lg:space-y-0 lg:flex-row text-muted text-sm justify-between items-center">
          <div>© 2022 dontgetscammed by @anthdm</div>
          <div className="flex space-x-6">
            <SocialIcon
              url="https://twitter.com/anthdm"
              target="_blank"
              network="twitter"
            />
            <SocialIcon
              url="https://github.com/anthdm"
              target="_blank"
              network="github"
              bgColor="#fff"
            />
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
