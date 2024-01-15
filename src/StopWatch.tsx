import React, { useEffect } from 'react'
import "./stopwatch.css"
import StopWatchButton from './StopWatchButton';
import { useState } from 'react'

export default function StopWatch() {
    const [startTime, setStartTime] = useState(Date.now());
    const [deltaTime, setDeltaTime] = useState(0);
    const [displayingTime, setDisplayingTime] = useState(0);
    const [isPaused, setPaused] = useState(true);

    useEffect(() => {
        // The interval runs every 10 milliseconds. This can be decreased but
        // this accuracy should be good enough for this example.
        setInterval(() => {
            setDeltaTime(Date.now());
        }, 10)
    })

    // Every time the deltaTime is updated, then the display should be updated.
    useEffect(() => {
        if(!isPaused) setDisplayingTime(deltaTime - startTime);
    }, [deltaTime, isPaused])

    // This function runs when the user starts the stopwatch.
    const handleStart = () => {
        setStartTime(Date.now());
        setPaused(false);
    }

    const handleStop = () => {
        setPaused(true);
    }

    const handleReset = () => {

    }

    const handleLap = () => {
        
    }

    return(
        <div className="stopwatch">
            <div className="stopwatch-display">{displayingTime}</div>

            <StopWatchButton label={"Start"} onPress={handleStart}></StopWatchButton>
            <StopWatchButton label={"Stop"} onPress={handleStop}></StopWatchButton>
            <StopWatchButton label={"Reset"} onPress={handleReset}></StopWatchButton>
            <StopWatchButton label={"Lap"} onPress={handleLap}></StopWatchButton>

        </div>
    )
}