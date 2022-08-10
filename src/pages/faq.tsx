import FaqSection from "components/FaqSection"
import PageContent from "components/PageContent"
import PageTitle from "components/PageTitle"
import type { NextPage } from "next"
import Link from "next/link"

const FAQ: NextPage = () => {
  return (
    <PageContent>
      <PageTitle>Frequently asked questions</PageTitle>

      <FaqSection title="Is the platform safe to use?">
        Yes! The platform uses its own isolated private Ethereum network for all
        adventures. You will receive or send virtual funds that have no real
        value.{" "}
        <span className="underline font-bold">
          I recommend you make a new account before you start the adventures.
        </span>
      </FaqSection>

      <FaqSection title="Is dontgetscammed responsible for any loss of real funds?">
        No! We do our best to prevent accidental mistakes by ensuring the wallet
        connection is to our private network. But unfortunately, we cannot stop
        users from bypassing our guidelines.
      </FaqSection>

      <FaqSection title="My virtual funds are gone!">
        The private network is reset each day at midnight (23:45 UTC). The
        platform will ensure you have enough virtual funds if the adventures
        require you to send currencies.
      </FaqSection>

      <FaqSection title="Are you planning to support other wallets besided MetaMask?">
        That is definitly on my TODO list.
      </FaqSection>

      <FaqSection title="Are there going to be more beginner adventures in the future?">
        For sure! If you have any suggestions, please fill in the feedback form
        <Link href="https://forms.gle/yXM7976bbDZo74xo7">
          <>
            {" "}
            <a className="text-blue-500 cursor-pointer font-bold underline">
              here.
            </a>
          </>
        </Link>
      </FaqSection>

      <FaqSection title="When will the advanced and expert adventures be released?">
        The release of advanced adventures is around September. The expert
        adventures will come soon after.
      </FaqSection>
    </PageContent>
  )
}

export default FAQ
