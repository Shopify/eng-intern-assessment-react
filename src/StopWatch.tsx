import React from 'react'
import "./styles.css"
import formatTime from './utils/formatTime'

interface StopwatchProps {
    time: number
}

export default function StopWatch({ time } : StopwatchProps) {
    return(
        <div className='display'>{formatTime(time)}</div>
    )
}
