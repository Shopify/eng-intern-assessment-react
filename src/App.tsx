import React, { useState, useEffect } from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

export default function App() {
    const [timer, setTimer] = useState(0) // total seconds
    const [counting, setCounting] = useState(false)
    const [lapTime, setLapTime] = useState(0)

    useEffect(() => {
        if(counting){
            const interval = setInterval(() => {
                console.log("hi")
                setTimer((prevCounter) => prevCounter + 1)
            }, 1000)

            return () => clearInterval(interval)
        }
    }, [counting])

    const start = () => {
        setCounting(true)
    }

    const stop = () => {
        setCounting(false)
    }

    const reset = () => {
        setTimer(0)
        setCounting(false)
    }

    const lap = () => {
        setLapTime(lapTime+1)
    }

    return(
        <div>
            <h1>Stopwatch</h1>
            <StopWatch time={timer} laps={lapTime} />
            <StopWatchButton action={start} text="Start"/>
            <StopWatchButton action={stop} text="Stop"/>
            <StopWatchButton action={reset} text="Reset"/>
            <StopWatchButton action={lap} text="Lap"/>
        </div>
    )
}

