import React, { useState, useEffect, useRef } from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

export default function App() {
    const [seconds, setSeconds] = useState(0);
    const [laps, setLaps] = useState<number[]>([]);
    const interval = useRef<NodeJS.Timeout | null>(null); // tracks how many seconds have passed
    
    const handleStart = () => {
        // adds 1 to seconds every 1000 milliseconds
        interval.current = setInterval(() => {
            setSeconds(seconds => seconds + 1);
        }, 1000);
    }

    const handleStop = () => {
        if (interval.current) {
            clearInterval(interval.current);
        }
    }

    const handleReset = () => {
        handleStop();
        setSeconds(0);
        setLaps([]);
    }
    
    const handleLap = () => {
        setLaps(laps => [...laps, seconds]);
    }

    // useEffect hook to clear the interval when the component unmounts
    useEffect(() => {
        return () => {
            handleStop();
        }
    }, []);

    return(
        <div 
         style={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            height: '100vh',
            background: "linear-gradient(to bottom, #FBF8EF 0%, #F7EFD7 100%)"}}
        >
            <h1 style={{ fontSize: '32px' }}>Stopwatch</h1>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <StopWatch seconds={seconds} />
                <StopWatchButton 
                  handleStart={handleStart} 
                  handleStop={handleStop} 
                  handleReset={handleReset} 
                  handleLap={handleLap} 
                />
                <div style={{ marginTop: '20px' }}>
                    {laps.map((time, index) => (
                        <p key={index} style={{ fontSize: '16px' }}>
                            Lap {index + 1}: {new Date(time * 1000).toISOString().substring(11, 19)}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}