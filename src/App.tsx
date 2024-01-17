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
        <div>
            <StopWatch>
                {time}
            </StopWatch>
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
    )
}