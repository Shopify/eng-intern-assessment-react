import React, { MouseEventHandler } from 'react'

export default function StopWatchButton({
  label,
  clickHandler
}: {
  label: string
  clickHandler: MouseEventHandler
}) {
  return (
    <button onClick={clickHandler}>
      {label}
    </button>
  )
}