import React, { useState, useEffect } from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

export default function App() {
    const [seconds, setSeconds] = useState(0);
    
    const handleStart = () => {
        console.log('Start');
    }
    const handleStop = () => {
        console.log('Stop');
    }
    const handleReset = () => {
        console.log('Reset');
    }
    const handleLap = () => {
        console.log('Lap');
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return(
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <h1 style={{ fontSize: '32px' }}>Stopwatch</h1>
            <StopWatch seconds={seconds} />
            <StopWatchButton 
              handleStart={handleStart} 
              handleStop={handleStop} 
              handleReset={handleReset} 
              handleLap={handleLap} 
            />
        </div>
    )
}