import React, { useState } from 'react'
import StopWatchButton from './StopWatchButton'

export default function StopWatch() {

    // Time is in seconds
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const handleStartStop = () => {
        setIsRunning(!isRunning);
    }

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
    }

    const handleLap = () => {
        // TODO: implement lapping
    }

    const formatTime = (timeInSeconds: number): string => {
        const hours: number = Math.floor(timeInSeconds / 3600);
        const minutes: number = Math.floor((timeInSeconds / 3600) / 60);
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

    return(
        <div>
            <div id={"time"}>{formatTime(time)}</div>
            <StopWatchButton onClick={handleStartStop} label={"Start"}/>
            <StopWatchButton onClick={handleStartStop} label={"Stop"}/>
            <StopWatchButton onClick={handleReset} label={"Reset"}/>
            <StopWatchButton onClick={handleLap} label={"Lap"}/>
        </div>
    )
}
