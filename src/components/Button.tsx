import React, { forwardRef } from "react"
import { PulseLoader } from "react-spinners"

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children?: React.ReactNode
  onClick?: (e: any) => void
  className?: string
  isDisabled?: boolean
  loading?: boolean
}

const Button = forwardRef<HTMLInputElement, ButtonProps>(
  ({ loading, children, onClick, className, isDisabled, ...props }, ref) => {
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
        {loading && (
          <div className="flex space-x-3 items-center">
            <p>processing</p>
            <PulseLoader size={8} color="#ffffff" />
          </div>
        )}
        {!loading && children}
      </button>
    )
  }
)

export default Button
