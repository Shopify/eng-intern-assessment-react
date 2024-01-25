import React from 'react'

interface LapProps {
    time: string
    lapNumber: number
}

export default function Lap({time, lapNumber} : LapProps) {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '200px' }}>
        <p>Lap {lapNumber}</p>
        <p> {time}</p>
      </div>
    )
}