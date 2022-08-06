import React from "react"

interface Props {
  children?: React.ReactNode
}

const PageContent: React.FC<Props> = ({ children }) => {
  return <div className="w-full lg:w-2/3">{children}</div>
}

export default PageContent
