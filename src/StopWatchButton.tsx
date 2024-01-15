import React from 'react'

interface StopWatchButtonProps {
  start: () => void
  reset: () => void
  isRunning: boolean
}

export default function StopWatchButton({start, reset, isRunning}: StopWatchButtonProps) {


  return(
    <div>
      <button type='button' onClick={start}>{isRunning ? 'Stop!' : 'Start!'}</button>
      <button type='button' onClick={reset}>Reset</button>
    </div>
  )
}