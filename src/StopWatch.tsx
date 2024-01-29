import React, { useState, useEffect } from 'react'
import StopWatchButton from './StopWatchButton'
import Lap from './Lap';

interface LapData {
    lapNumber: number;
    time: string;
}

export default function StopWatch() {
    
    const [isRunning, setIsRunning] = useState<boolean>(false); // tracks if the stopwatch is running 
    const [timeSinceStart, setTimeSinceStart] = useState<number>(0);  // stores the time in milliseconds after starting the stopwatch
    const [laps, setLaps] = useState<LapData[]>([]);  

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

    const lapsHandler = () => {
        const lapNumber = laps.length + 1
        const formattedTime = formatTime(timeSinceStart)
        setLaps([...laps, {lapNumber: lapNumber, time: formattedTime}])
    }


    const formatTime = (timeInMs : number): string => {
        const minutes = Math.floor(timeInMs / (60 * 1000));
        const seconds = Math.floor((timeInMs % (60 * 1000)) / 1000);
        const ms = Math.floor((timeInMs % 1000) / 10);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
    };

    return (
        <div>
            <div className="time-text" data-testid="time-text">
                {formatTime(timeSinceStart)}
            </div>
            <div className="button-container">
                <StopWatchButton type="Start" isDisabled={isRunning} clickHandler={startStopHandler} className="stop-watch-button start-button"/>
                <StopWatchButton type="Reset" isDisabled={isRunning} clickHandler={resetHandler} className="stop-watch-button reset-button"/>
                <StopWatchButton type="Stop" isDisabled={!isRunning} clickHandler={startStopHandler} className="stop-watch-button stop-button"/>
                <StopWatchButton type="Lap" isDisabled={!isRunning} clickHandler={lapsHandler} className="stop-watch-button lap-button"/>
            </div>
            <div className="lap-list-container">
                <ul>
                    {laps.slice().reverse().map((lap) => (
                        <li key={lap.lapNumber}>
                            <Lap lapNumber={lap.lapNumber} time={lap.time}/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}