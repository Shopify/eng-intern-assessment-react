import React from 'react'
import './styles/StopWatch.css'

interface StopWatchProps{
    timeString: string
}

// Component to render the main stopwatch timer clock 
export default function StopWatch({timeString}:StopWatchProps) {
    return(
        <div className="stopWatchContainer">
            {timeString}
        </div>
    )
}