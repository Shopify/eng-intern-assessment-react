import React, { useState } from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

/**
 * Stopwatch App
 * This component handles the coordination between the display and buttons,
 * and holds the state for the timer itself.
 */
export default function App() {
    const [running, setRunning] = useState(false)
    const [time, setTime] = useState("00:00:00")

    let startTime = Date.now()
    let endTime = Date.now()

    return(
        <main className="max-w-3xl mx-auto m-5">
            <h1 className='text-4xl'>
                Stopwatch
            </h1>
            <StopWatch>
                {time}
            </StopWatch>
            <div className="grid grid-cols-4 gap-2">
                <StopWatchButton>
                    Start
                </StopWatchButton>
                <StopWatchButton>
                    Stop
                </StopWatchButton>
                <StopWatchButton>
                    Lap
                </StopWatchButton>
                <StopWatchButton>
                    Reset
                </StopWatchButton>
            </div>
        </main>
    )
}