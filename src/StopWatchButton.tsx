import React from 'react'
import "./StopWatchButton.css"

/**
 * @typedef {Object} StopwatchButtonProps
 * @property {function} onStart- Callback function handles Start button click
 * @property {function} onStop- Callback function handles Stop button click
 * @property {function} onLap- Callback function handles Lap button click 
 * @property {function} onReset- Callback function handles Reset button click 
 * @property {boolnea} isActive- Shows if stopwatch is running or not. 
 */
interface StopwatchButtonProps {
    onStart: () => void
    onStop: () => void
    onLap: () => void
    onReset: () => void
    isActive: boolean
}

/**
 * Component that represents the buttons that control the stopwatch.
 * The buttons included are: Start, Stop, Lap and Reset. Each buttons functionality is dependent on the state of the stopwatch. 
 * @param {StopwatchButtonProps} props- The props for the component.
 * @returns 
 */
export default function StopwatchButton({
    onStart,
    onStop,
    onLap,
    onReset,
    isActive,
}: StopwatchButtonProps) {
    return (
        <div className='button-container'>
            {/* Start Button */}
            <button className='stopwatch-button' data-testid="start-button" onClick={onStart} disabled={isActive}>
                Start
            </button>

            {/* Lap button */}
            <button className='stopwatch-button' data-testid="lap-button" onClick={onLap} disabled={!isActive}>
                Lap
            </button>

            {/* Stop button */}
            <button className='stopwatch-button' data-testid="stop-button" onClick={onStop} disabled={!isActive}>
                Stop
            </button>

            {/* Reset button */}
            <button className='stopwatch-button' data-testid="reset-button" onClick={onReset}>
                Reset
            </button>
        </div>
    );
}


