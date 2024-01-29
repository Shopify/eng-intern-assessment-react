import React from 'react';
import { useState } from "react";
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import LappedTime from './LappedTime';

export default function App() {

    const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
    const [secondCount, setSecondCount] = useState<number>(0);
    const [lappedTime, setLappedTime] = useState<number[]>([]);
    const [pastLaps, setPastLaps] = useState<number>(0);

    const handleStartButton = (): void => {
        let second:any = setInterval(():void => {
            setTimeInSeconds((previousState:number) =>
                previousState + 1)
        }, 1000);
        setSecondCount(second);   
    }

    const handleStopButton = (): void => {
        clearInterval(secondCount);
    }

    const handleResetButton = (): void => {
        clearInterval(secondCount);
        setTimeInSeconds(0);
        setLappedTime([]);
        setPastLaps(0);
    }

    const handleLapButton = (): void => {
        const currentLap: number = timeInSeconds - pastLaps;

        setLappedTime([...lappedTime, currentLap]);
        setPastLaps(timeInSeconds);
    }

    return(
        <div className='main_container'>
            <StopWatch 
                timeInSeconds={timeInSeconds}
                />
            <StopWatchButton 
                timeInSeconds={timeInSeconds}
                lappedTime={lappedTime}
                handleStartButton={handleStartButton}
                handleStopButton={handleStopButton}
                handleResetButton={handleResetButton}
                handleLapButton={handleLapButton}
                />
            <LappedTime
                lappedTime={lappedTime}
                />
        </div>
    )
}