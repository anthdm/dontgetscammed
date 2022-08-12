import React from "react"

interface CardTitleProps {
  children?: React.ReactNode
}

export const CardTitle: React.FC<CardTitleProps> = ({ children }) => {
  return (
    <h3 className="text-lg lg:text-xl mb-4 font-bold text-white">{children}</h3>
  )
}

interface CardPProps {
  children?: React.ReactNode
}

export const CardP: React.FC<CardPProps> = ({ children }) => {
  return <h3 className="lg:text-lg text-white">{children}</h3>
}

interface ErrorCardProps {
  title?: string
  msg: string
}

export const ErrorCard: React.FC<ErrorCardProps> = ({ title, msg }) => {
  return (
    <Card error={true} className="mt-6">
      {title && <h3 className="text-xl mb-4 font-bold ">{title}</h3>}
      <p className="text-lg">{msg}</p>
    </Card>
  )
}

interface CardProps {
  children?: React.ReactNode
  className?: string
  error?: boolean
}

const Card: React.FC<CardProps> = ({ children, className, error }) => {
  let cname = `p-6 rounded-lg w-full bg-black-dimmed overflow-clip ${className}`
  if (error) {
    cname = `border border-red-400 ${cname}`
  }
  return <div className={cname}>{children}</div>
}

export default Card
