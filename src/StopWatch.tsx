import React from 'react'

interface StopWatchProps {
  time: number
}

export default function StopWatch({time}: StopWatchProps) {
  return(
    <div>
      <p>{time.toFixed(2)}</p>
    </div>
  )
}