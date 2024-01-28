import React from 'react'
import './StopWatchButton.css'

/**
 * Props for the StopWatchButton component
 * @param isRunning true if the stopwatch is running, false otherwise
 * @param stopStart a void function that toggles the running state
 * @param lap a void function that records a lap
 * @param reset a void function that resets the stopwatch
 */
interface StopWatchButtonProps {
    isRunning: boolean
    stopStart: () => void
    lap: () => void
    reset: () => void
}

/**
 * A component that displays the buttons for the stopwatch with no default button click behaviour
 * Provide functions for the buttons to call as props
 * @param props StopWatchButtonProps
 * @returns a div element that contains the buttons in a row
 */
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