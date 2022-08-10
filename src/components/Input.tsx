import React, { forwardRef } from "react"

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  placeholder?: string
  className?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, className, ...props }, ref) => {
    return (
      <input
        ref={ref as any}
        placeholder={placeholder}
        className={`rounded-xl py-3 px-4 w-full outline-none text-white bg-black-dimmed focus:outline-1 outline-dgs-border focus:outline-blue-500 ${className}`}
        {...(props as any)}
      />
    )
  }
)

export default Input
