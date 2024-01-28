// The Application Component - Contains all core state and logic for the stopwatch app
import React, { useState, useEffect } from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import Laps from './Laps'

// Bonus Interface to display lap history with lap # and time in seconds
export interface LapHistoryInterface {
    lap: number
    time: number
}

export default function App() {
    // The Application State
    const [isRunning, setIsRunning] = useState(false as boolean)
    const [stopwatchTime, setStopwatchTime] = useState(0 as number)
    const [laps, setLaps] = useState(0 as number)
    const [lapHistory, setLapHistory] = useState([] as LapHistoryInterface[])

    // The useEffect hook to update lap # and lap history
    useEffect(() => {
        if (isRunning) {
            setStopwatchTime(0)
        } else {
            if (stopwatchTime > 0) {
                setLapHistory([
                    ...lapHistory,
                    { lap: laps + 1, time: stopwatchTime },
                ])
                setLaps(laps + 1)
            }
        }
    }, [isRunning])

    // The useEffect hook to update stopwatch time
    useEffect(() => {
        if (isRunning) {
            const timeout = setTimeout(() => setStopwatchTime(stopwatchTime + 1), 1000)
            return () => clearTimeout(timeout)
        }
    }, [isRunning, stopwatchTime])

    return(
        <div className="stopwatch-app">
            <StopWatch
                stopwatchTime={stopwatchTime}
                laps={laps}
            />
            <StopWatchButton
                isRunning={isRunning}
                setIsRunning={setIsRunning}
            />
            <Laps
                lapHistory={lapHistory}
            />
        </div>
    )
}