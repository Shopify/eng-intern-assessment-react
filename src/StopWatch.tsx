// The Stopwatch Display Component - Displays the time and lap #
import React from 'react'

export interface StopwatchInterface {
    stopwatchTime: number
    laps: number
}

export default function StopWatch({ stopwatchTime, laps }: StopwatchInterface) {
    return(
        <div className="stopwatch-display">
            <div className="stopwatch-display-item">
                <p className="label">Time</p>
                <p className="value">{stopwatchTime}</p>
            </div>
            <div className="stopwatch-display-item">
                <p className="label">Laps</p>
                <p className="value">{laps}</p>
            </div>
        </div>
    )
}