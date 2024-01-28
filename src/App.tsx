import React, { useState, useEffect } from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import Laps from './Laps'

export interface LapHistoryInterface {
    lap: number
    time: number
}

export default function App() {
    const [isRunning, setIsRunning] = useState(false as boolean)
    const [stopwatchTime, setStopwatchTime] = useState(0 as number)
    const [laps, setLaps] = useState(0 as number)
    const [lapHistory, setLapHistory] = useState([] as LapHistoryInterface[])

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