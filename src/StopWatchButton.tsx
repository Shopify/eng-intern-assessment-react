import React from 'react'
import './StopWatchButton.css'

interface StopWatchButtonProps {
    isRunning: boolean
    stopStart: () => void
    lap: () => void
    reset: () => void
}

export default function StopWatchButton(props: StopWatchButtonProps) {
    return(
        <div
            className="stopwatch-button-row"
        >
            <button
                onClick={props.stopStart}
                className="stopwatch-button"
            >
                {props.isRunning ? 'Stop' : 'Start'}
            </button>
            <button
                onClick={props.lap}
                className="stopwatch-button"
            >
                Lap
            </button>
            <button
                onClick={props.reset}
                className="stopwatch-button"
            >
                Reset
            </button>
        </div>
    )
}