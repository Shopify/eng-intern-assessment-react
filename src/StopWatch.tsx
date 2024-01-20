// Responsible for time display
import React, {useState, useEffect} from 'react'
import '../styles/StopWatch.css'
interface Props {
    elapsedTime: String
}
export default function StopWatch({elapsedTime}: Props) {
    return(
        <div className="stopwatch">{elapsedTime}</div>
    )
}