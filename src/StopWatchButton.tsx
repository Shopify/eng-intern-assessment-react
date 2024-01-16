import React from "react"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

export const StopWatchButton = (props: Props) => {
  const { className = "", ...rest } = props
  return (
    <button
      className={`w-32 text-2xl aspect-square rounded-full border-4 border-gray-500 enabled:hover:shadow-lg enabled:hover:scale-105 enabled:active:shadow-none transition-all duration-100 font-black disabled:opacity-60 ${className}`}
      {...rest}
    />
  )
}
