import React from 'react'

export interface StopWatchButtonProps {
    /** Indicate if the stopwatch is being active or not */
    isUsed: boolean;
    /** Indicate if the stopwatch is running or not */
    isRunning: boolean;
    /** Handler once stopwatch is started */
    onStart: () => void
    /** Handler once stopwatch is stopped */
    onStop: () => void
    /** Handler once stopwatch is reset */
    onReset: () => void
    /** Handler once stopwatch is lap */
    onLap: () => void
}

/**
 * Stop watch buttons component
 * 
 * @param isUsed    indicates if stopwatch is active
 * @param isRunning indicates if stopwatch is running
 * @param onStart   handler once stopwatch is started
 * @param onStop    handler once stopwatch is stoppped
 * @param onReset   handler once stopwatch is reset
 * @param onLap     handler once a lap is being save
 *  
 * @returns  
 */
export default function StopWatchButton({isUsed, isRunning, onStart, onStop, onReset, onLap}: StopWatchButtonProps) {
    return (
        <div className='button-container'>
            <button className='button reset' disabled={!isUsed || isRunning} onClick={onReset}>Reset</button>
            <button className='button' disabled={!isUsed || !isRunning} onClick={onLap}>Lap</button>
            <button className={(!isRunning || !isUsed)? 'button start': 'button stop'} onClick={isRunning ? onStop : onStart}>{isRunning ? "Stop": "Start"}</button>
        </div>
    )
}