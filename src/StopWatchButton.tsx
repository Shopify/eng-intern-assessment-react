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
                data-testid="stopwatch-startstop"
                onClick={props.stopStart}
                className="stopwatch-button"
            >
                {props.isRunning ? 'Stop' : 'Start'}
            </button>
            <button
                data-testid="stopwatch-lap"
                onClick={props.lap}
                className="stopwatch-button"
            >
                Lap
            </button>
            <button
                data-testid="stopwatch-reset"
                onClick={props.reset}
                className="stopwatch-button"
            >
                Reset
            </button>
        </div>
    )
}