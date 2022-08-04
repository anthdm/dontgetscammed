import React from "react"

interface ButtonProps {
  children?: React.ReactNode
  onClick?: (e: any) => void
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-600 px-4 py-3 rounded-xl font-bold"
    >
      {children}
    </button>
  )
}

export default Button
