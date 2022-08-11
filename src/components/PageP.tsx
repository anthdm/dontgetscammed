import React from "react"

interface Props {
  children?: React.ReactNode
  customClass?: string
  primary?: boolean
}

export const P: React.FC<Props> = ({ children, customClass, primary }) => {
  const color = primary ? "text-blue-500" : "text-muted"
  return <div className={`lg:text-lg ${color} ${customClass}`}>{children}</div>
}

interface PagePProps {
  children?: React.ReactNode
  className?: string
}

const PageP: React.FC<PagePProps> = ({ children, className }) => {
  const _className = `lg:text-lg text-muted ${className}`
  return <p className={_className}>{children}</p>
}

export default PageP
