import React from "react"

interface ButtonProps {
  children?: React.ReactNode
  onClick?: (e: any) => void
  className?: string
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  disabled
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`bg-blue-500 ${
        !disabled && `hover:bg-blue-600`
      } px-4 py-3 rounded-xl font-bold ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
