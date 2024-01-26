import React from 'react'

export default function StopWatch({
  timer
}: {
  timer: string
}) {
  return (
    <div>
      <h1>StopWatch</h1>
      <h2>{timer}</h2>
    </div>
  )
}