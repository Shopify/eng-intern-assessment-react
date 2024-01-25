import React from 'react'

interface LapProps {
    time: string
    lapNumber: number
}

export default function Lap({time, lapNumber} : LapProps) {
    return (
      <div className="lap-item">
        <p>LAP {lapNumber}</p>
        <p> {time}</p>
      </div>
    )
}