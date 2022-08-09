import Button from "components/Button"
import PageContent from "components/PageContent"
import PageP from "components/PageP"
import PageTitle from "components/PageTitle"
import Spacer from "components/Spacer"
import Link from "next/link"
import React from "react"

const Result: React.FC = () => {
  return (
    <PageContent>
      <PageTitle>Results</PageTitle>
      <PageP>Good job! You just completed the beginner adventures.</PageP>
      <Spacer />
      <Link href="/">
        <Button>Back to home</Button>
      </Link>
    </PageContent>
  )
}

export default Result
