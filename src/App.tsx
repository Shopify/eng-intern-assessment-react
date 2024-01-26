import React, { useState, useEffect } from 'react'
import Stopwatch from './StopWatch'
import StopwatchButton from './StopWatchButton';
import './styles/App.css'

export default function App() {
    const [time, setTime] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [laps, setLaps] = useState<number[]>([])

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null; // Declare interval here for scope
    
        if (isRunning) {
            // Set the interval
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        }
    
        // Cleanup function
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isRunning]);

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
        const lastLapTime = laps.length > 0 ? laps[laps.length - 1] : 0;
        setLaps([...laps, time - lastLapTime]);
    };
    return(
        <div className='body'>
            <StopwatchButton 
                isRunning={isRunning} 
                onStart={handleStart} 
                onStop={handleStop} 
                onReset={handleReset} 
                onLap={handleLap} 
            />
            <Stopwatch time={time} laps={laps} />
        </div>
    )
}