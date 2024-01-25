import React, { useState, useEffect } from 'react'
import StopWatchButton from './StopWatchButton'


export default function StopWatch() {
    
    const [isRunning, setIsRunning] = useState<boolean>(false); // tracks if the stopwatch is running 
    const [timeSinceStart, setTimeSinceStart] = useState<number>(0);  // stores the time in milliseconds after starting the stopwatch
    const [laps, setLaps] = useState<Array<string>>([]);  

    useEffect(() => {
        let interval : NodeJS.Timeout;
        if (isRunning) {
            // every 10 ms -> update the elapsed time using the previous elapsedTime value
            interval = setInterval(() => {
                setTimeSinceStart((prevTime) => prevTime + 10);
            }, 10);
        }
        // when isRunning changes to false -> stops the interval (and thus the timer)
        return () => {
            clearInterval(interval);
        };
      
    }, [isRunning]);

    const startStopHandler = () => {
        setIsRunning(!isRunning)
    }

    const resetHandler = () => {
        setIsRunning(false)
        setTimeSinceStart(0)
        setLaps([])
    }

    const formatTime = (timeInMs : number): string => {
        const minutes = Math.floor(timeInMs / (60 * 1000));
        const seconds = Math.floor((timeInMs % (60 * 1000)) / 1000);
        const ms = Math.floor((timeInMs % 1000) / 10);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
    };

    return (
        <div>
            <div>
                {formatTime(timeSinceStart)}
            </div>
            <StopWatchButton type="Start" isDisabled={isRunning} clickHandler={startStopHandler}/>
            <StopWatchButton type="Reset" isDisabled={isRunning} clickHandler={resetHandler}/>
            <StopWatchButton type="Lap" isDisabled={!isRunning} clickHandler={startStopHandler}/>
            <StopWatchButton type="Stop" isDisabled={!isRunning} clickHandler={startStopHandler}/>
        </div>
    )
}