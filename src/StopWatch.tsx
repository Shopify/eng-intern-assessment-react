import React from 'react'

export default function StopWatch({
  timer
}: {
  timer: number
}) {

  return (
    <div>
      {timer.toString()}
    </div>
  )
}