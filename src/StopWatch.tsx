import React from 'react'
import { useState, useEffect, useRef } from "react";
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
    const [elapsedTime, setElapsedTime] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [laps, setLaps] = useState<number[]>([])
    const startTime = useRef(0)

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>

        // Update time every 10 miliseconds
        if (isRunning) {
            interval = setInterval(() => {
                setElapsedTime(Date.now() - startTime.current)
            }, 10)
        }
        
        // Clear interval when stopwatch is stopped
        return () => {
            clearInterval(interval)
        }
    }, [isRunning])

    const handleStart = () => {
        setIsRunning(true)
        startTime.current = Date.now() - elapsedTime
    }

    const handleStop = () => {
        setIsRunning(false)
    }

    const handleReset = () => {
        setElapsedTime(0)
        setIsRunning(false)
        setLaps([])
    }

    const handleLaps = () => {
        setLaps(prevLaps => [...prevLaps, elapsedTime])
    }

    // Function to separate time in miliseconds to hours, minutes, and seconds
    const displayTime = (time: number) => {
        let hours = Math.floor((time / (1000 * 60 * 60)) % 24)
        let mins = Math.floor((time / (1000 * 60)) % 60)
        let secs = Math.floor((time / 1000) % 60)
        let milisecs = Math.floor((time % 1000) / 10)
        return `${hours < 10 ? "0" + hours: hours}:${mins < 10 ? "0" + mins: mins}:${secs < 10 ? "0" + secs: secs}:${milisecs < 10 ? "0" + milisecs: milisecs}`
    }

    return(
        <div className="StopWatch" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <h1>StopWatch</h1>
            <h2>{displayTime(elapsedTime)}</h2>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <StopWatchButton text={"Start"} handleClick={handleStart}/>
                <StopWatchButton text={"Stop"} handleClick={handleStop}/>
                <StopWatchButton text={"Reset"} handleClick={handleReset}/>
                <StopWatchButton text={"New Lap"} handleClick={handleLaps}/>
            </div>

            {!laps.length ? null : laps.map((lap, idx) => {
                if (idx == 0) {
                    return <p>Lap {idx+1}: {displayTime(lap)}</p>
                } else {
                    return <p>Lap {idx+1}: {displayTime(lap - laps[idx-1])}</p>
                }
            }) }
        </div>
    )
}