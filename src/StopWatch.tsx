// A component that represents the stopwatch display
import React from 'react'
import '../styles/StopWatch.css'
interface Props {
    elapsedTime: String
}
export default function StopWatch({elapsedTime}: Props) {
    return(
        <div className="stopwatch">{elapsedTime}</div>
    )
}