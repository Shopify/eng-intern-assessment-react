import React, { useState, useEffect } from 'react'
import StopWatchButton from './StopWatchButton'
import { formatTime } from './utils/FormatTime';
import { Laps } from './components/Laps';

export default function StopWatch() {

    // Time is in seconds
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [lapTimes, steLapTimes] = useState<number[]>([]);

    const handleStartStop = () => {
        setIsRunning(!isRunning);
    }

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        steLapTimes([]);
    }

    const handleLap = () => {
        if (isRunning) {
            // Add a new lap time to the list, treating it as a stack
            const lapTime = time;
            steLapTimes((prevTimes) => [lapTime, ...prevTimes]);
        }
    }

    // Set up an interval that updates the time ever second whenever isRunning is changed (start/stopped)
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning) {
            interval = setInterval(() => {
                setTime((prev_time) => prev_time + 1)
            }, 1000)
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    return(
        <div>
            <div id={"time"}>{formatTime(time)}</div>
            <StopWatchButton onClick={handleStartStop} label={isRunning ? "Stop" : "Start"}/>
            <StopWatchButton onClick={handleReset} label={"Reset"}/>
            <StopWatchButton onClick={handleLap} label={"Lap"}/>
            <Laps lapTimes={lapTimes} />
        </div>
    )
}
