import React from 'react'
import './styles/StopWatch.css'

interface StopWatchProps{
    timer?: number
}

export default function StopWatch({timer=0}:StopWatchProps) {
    return(
        <div className="stopWatchContainer">
            {timer}
        </div>
    )
}