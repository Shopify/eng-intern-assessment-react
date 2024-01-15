import React from 'react'

interface StopWatchProps {
  minutes: string
  seconds: string
  milliseconds: string
}

export default function StopWatch({minutes, seconds, milliseconds}: StopWatchProps) {
  return(
    <div>
      <p>{minutes}:{seconds}:{milliseconds}</p>
    </div>
  )
}