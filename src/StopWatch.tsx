import React from 'react'
import './styles/StopWatch.css'

interface StopWatchProps{
    timeString?: string
}

// Component to render the main stopwatch timer clock 
export default function StopWatch({timeString="00:00:00:00"}:StopWatchProps) {
    return(
        <div className="stopWatchContainer" data-testid="stopWatchTest">
            {timeString}
        </div>
    )
}