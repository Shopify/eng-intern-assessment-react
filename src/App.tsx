import React, { useState, useEffect } from 'react'
import Stopwatch from './StopWatch'
import StopwatchButton from './StopWatchButton';

export default function App() {
    const [time, setTime] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [laps, setLaps] = useState<number[]>([])

    useEffect(() => {
        if (isRunning){
            const interval = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10)
        }
    })

    // Start the stopwatch
    const handleStart = () => setIsRunning(true);

    // Stop the stopwatch
    const handleStop = () => setIsRunning(false);

    // Reset the stopwatch
    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    };

    // Record a lap
    const handleLap = () => {
        setLaps([...laps, time]);
    };
    return(
        <div>
            <Stopwatch time={time} laps={laps} />
            <StopwatchButton 
                isRunning={isRunning} 
                onStart={handleStart} 
                onStop={handleStop} 
                onReset={handleReset} 
                onLap={handleLap} 
            />
        </div>
    )
}