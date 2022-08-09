import Card from "components/Card"
import PageContent from "components/PageContent"
import PageP from "components/PageP"
import Spacer from "components/Spacer"
import type { NextPage } from "next"
import Link from "next/link"

const LeaderBoard: NextPage = () => {
  return (
    <PageContent>
      <Card className="border border-blue-400">
        <h3 className="text-xl mb-4 font-bold">Hold on tight!</h3>
        <PageP></PageP>
        <Spacer />
        <Link href="/">
          <a className="text-blue-400 font-bold hover:underline">
            Take me back
          </a>
        </Link>
      </Card>
    </PageContent>
  )
}

export default LeaderBoard
