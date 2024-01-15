import React from 'react'

export interface StopWatchButtonProps {
    isUsed: boolean;
    isRunning: boolean;
    onStart: () => void
    onStop: () => void
    onReset: () => void
    onLap: () => void
}

export default function StopWatchButton({isUsed, isRunning, onStart, onStop, onReset, onLap}: StopWatchButtonProps) {
    // a state controlling start and stop button since they are using the same button
    // a state controlling reset and lap button since they are using the same button
    // lap disabled at first
    return (
        <div>
            <button className='button reset' disabled={!isUsed || isRunning} onClick={onReset}>Reset</button>
            <button className='button' disabled={!isUsed && isRunning} onClick={onLap}>Lap</button>
            <button className={(!isRunning || !isUsed)? 'button start': 'button stop'} onClick={isRunning ? onStop : onStart}>{isRunning ? "Stop": "Start"}</button>
        </div>
    )
}