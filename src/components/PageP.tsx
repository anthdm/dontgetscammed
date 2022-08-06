import React from "react"

interface PagePProps {
  children?: React.ReactNode
  className?: string
}

const PageP: React.FC<PagePProps> = ({ children, className }) => {
  return <p className={`lg:text-lg text-muted ${className}`}>{children}</p>
}

export default PageP
