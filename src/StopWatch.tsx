import React from 'react'

export default function StopWatch({
  timer
}: {
  timer: string
}) {

  return (
    <div>
      <h1>{timer}</h1>
    </div>
  )
}