import React from "react"

interface PageTitleProps {
  children?: React.ReactNode
}

const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
  return <h1 className="text-3xl lg:text-5xl mb-5">{children}</h1>
}

export default PageTitle
