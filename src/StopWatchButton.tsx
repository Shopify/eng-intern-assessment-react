import React from 'react'

interface StopWatchButtonProps {
    isRunning: boolean
    startStop : () => void
    lapButton : () => void
    resetButton : () => void
}

export default function StopWatchButton({
    isRunning, 
    startStop, 
    lapButton, 
    resetButton} : StopWatchButtonProps) {
    return(
        <div>
            <button onClick={startStop}>
                {isRunning ? "Stop" :  "Start"}
            </button>
            <button onClick={lapButton}>
                Lap
            </button>
            <button onClick={resetButton}>
                Reset
            </button>
        </div>
    )
}