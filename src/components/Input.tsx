import React, { forwardRef } from "react"

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  placeholder?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, ...props }, ref) => {
    return (
      <input
        ref={ref as any}
        placeholder={placeholder}
        className="rounded-xl py-4 px-4 w-full outline-none text-white bg-black-dimmed focus:outline-1 focus:outline-bound-border"
        {...(props as any)}
      />
    )
  }
)

export default Input
