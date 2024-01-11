import React from 'react'
import "./styles.css"

interface StopwatchProps {
    time: number
}

const formatTime = (time: number): string => {
    const padWithZero = (value: number): string => value.toString().padStart(2, '0') // pads so that all units of time are 2 digits
    const milliseconds = padWithZero(Math.floor((time % 1000) / 10))
    const seconds = padWithZero(Math.floor((time / 1000) % 60))
    const minutes = padWithZero(Math.floor((time / (1000 * 60)) % 60))

    return `${minutes} : ${seconds} : ${milliseconds}`
}

export default function StopWatch({ time } : StopwatchProps) {
    return(
        <div className='display'>{formatTime(time)}</div>
    )
}
