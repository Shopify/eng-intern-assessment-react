import React, { useState, useEffect } from 'react'
import StopWatchButton from './StopWatchButton'

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
            // Add a new lap time to the list
            const lapTime = time;
            steLapTimes((prevTimes) => [...prevTimes, lapTime]);
        }
    }

    const formatTime = (timeInSeconds: number): string => {
        const hours: number = Math.floor(timeInSeconds / 3600);
        const minutes: number = Math.floor((timeInSeconds % 3600) / 60);
        const seconds: number = timeInSeconds % 60;

        return `${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`
    }

    // Function to add a leading zero given a number
    // ex: num = 1
    //     return = 01
    // ex: num = 21
    //     return = 21
    const addLeadingZero = (num: number): string => {
        return `${num < 10 ? '0' : ''}${num}`
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
            <div data-testid="lap-times">
                {lapTimes.length > 0 && (
                    <div className="grid-container title">
                        <div>Number</div>
                        <div>Splits</div>
                        <div>Total</div>
                    </div>
                )}
                {/*
                    For potential optimization, only keep track of most recent lap time/last time the lap button was hit
                    and calcualte the split and current lap at that time. Discard older values and only update container
                    w/i the new lap time.
                */}
                {lapTimes.map((lap, index) => (
                    <div key={index} className="grid-container" >
                        <div>Lap {index + 1}</div>
                        <div data-testid="split-time">{formatTime(index > 0 ? lap - lapTimes[index - 1] : lap)}</div>
                        <div data-testid="total-time">{formatTime(lap)}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
