import React, { forwardRef } from "react"

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children?: React.ReactNode
  onClick?: (e: any) => void
  className?: string
  isDisabled?: boolean
}

const Button = forwardRef<HTMLInputElement, ButtonProps>(
  ({ children, onClick, className, isDisabled, ...props }, ref) => {
    return (
      <button
        ref={ref as any}
        type="button"
        onClick={onClick}
        className={`bg-blue-500 ${
          !isDisabled && `hover:bg-blue-600`
        } px-4 py-3 rounded-xl font-bold ${className}`}
        disabled={isDisabled}
        {...(props as any)}
      >
        {children}
      </button>
    )
  }
)

export default Button
