import React from 'react'
import './styles/StopWatch.css'

interface StopWatchProps{
    timeString: string
}

export default function StopWatch({timeString}:StopWatchProps) {
    return(
        <div className="stopWatchContainer">
            {timeString}
        </div>
    )
}