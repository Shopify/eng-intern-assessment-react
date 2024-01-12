import React from 'react'
import "./styles.css"
import formatTime from './utils/formatTime'

interface LapTimesProps {
    lapTimes : string[]
}

export default function LapTimes({ lapTimes } : LapTimesProps) {
    return (
        <div className='lapTimes'>
            {lapTimes.map((lapTime, index) => (
                <div key={index}> Lap {index + 1}: {lapTime} ms</div>
            ))}
        </div>
    )
}
