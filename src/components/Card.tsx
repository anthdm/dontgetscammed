import React from "react"

interface CardProps {
  children?: React.ReactNode
  className?: string
  error?: boolean
}

const Card: React.FC<CardProps> = ({ children, className, error }) => {
  let cname = `p-6 rounded-lg w-full bg-black-dimmed ${className}`
  if (error) {
    cname = `border border-red-400 ${cname}`
  }
  return <div className={cname}>{children}</div>
}

export default Card
