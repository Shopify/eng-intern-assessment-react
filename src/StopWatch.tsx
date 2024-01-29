import React, { useState, useEffect, useCallback } from 'react'
import StopWatchButton from './StopWatchButton'

export default function StopWatch() {

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const formatTime = (milliseconds: number): string => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const millisecondsPart = (milliseconds % 1000).toString().padStart(3, '0');

        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${millisecondsPart}s`;
    };

    const startStopwatch = useCallback(() => {
        setIsRunning(true);
    }, []);

    const stopStopwatch = useCallback(() => {
        setIsRunning(false);
    }, []);

    const resetStopwatch = useCallback(() => {
        setTime(0);
        setIsRunning(false);
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isRunning) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 10); // Increment time every 10 milliseconds
            }, 10);
        }

        return () => clearInterval(timer);
    }, [isRunning]);

    return(
        <div className='stopwatch'>
            <h2 className='stopwatch-time'>{formatTime(time)}</h2>
            <div className="stopwatch-buttons">
                <StopWatchButton label='start' onClick={startStopwatch}/>
                <StopWatchButton label='stop' onClick={stopStopwatch}/>
                <StopWatchButton label='reset' onClick={resetStopwatch}/>
            </div>
        </div>
    )
}