import React from "react"
import PageP from "components/PageP"
import Spacer from "components/Spacer"

interface FaqSectionProps {
  title: string
  children?: React.ReactNode
}

const FaqSection: React.FC<FaqSectionProps> = ({ title, children }) => {
  return (
    <>
      <Spacer />
      <PageP className="font-bold text-blue-400">{title}</PageP>
      <PageP>{children}</PageP>
    </>
  )
}

export default FaqSection
