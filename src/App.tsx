import React from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

export default function App() {

    const handleStart = () => {
        console.log('Start button clicked')
    }
    const handleStop = () => {
        console.log('Stop button clicked')
    }
    const handleReset = () => {
        console.log('Reset button clicked')
    }
    const handleLap = () => {
        console.log('Lap button clicked')
    }
    return(
        <div>
            <h1>Stopwatch</h1>
            <StopWatchButton
                onStart={ handleStart}
                onStop={ handleStop}
                onReset={ handleReset}
                onLap={ handleLap} />
        </div>
    )
}