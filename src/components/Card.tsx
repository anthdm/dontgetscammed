import React from "react"

interface CardProps {
  children?: React.ReactNode
}

const Card: React.FC<CardProps> = ({ children }) => {
  return <div className="p-6 rounded-lg w-full bg-black-dimmed">{children}</div>
}

export default Card
