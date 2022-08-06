import PageContent from "components/PageContent"
import PageP from "components/PageP"
import type { NextPage } from "next"
import Link from "next/link"

const Home: NextPage = () => {
  return (
    <div className="flex flex-col">
      <PageContent>
        <h1 className="text-3xl lg:text-5xl font-bold tracking-wide leading-tight mb-6">
          An interactive platform that prepares you to enter the world of
          cryptocurrencies without getting scamed
        </h1>
        <PageP>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste alias
          saepe autem, veniam perferendis eaque consequatur earum at accusantium
          laudantium ea ratione. Aliquid praesentium obcaecati maxime laudantium
          dolor. Iusto, deleniti?
        </PageP>
      </PageContent>
      <div className="mt-10">
        <h2 className="text-2xl mb-6">Are you ready to start your yourney?</h2>
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
