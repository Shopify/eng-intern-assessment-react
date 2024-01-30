import React from 'react';
import { useState } from "react";
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import LappedTime from './LappedTime';
import './styles/App.scss';

export default function App() {

    // switches to true when stop watch is running so that "handleStart" can't be called when stopwatch is already counting (switches to false when stopwatch is stopped or reset)
    const [stopWatchCounting, setStopWatchCounting] = useState<boolean>(false);

    // holds the total time (in seconds) that stopwatch has been running for (resets to 0 when stopwatch is reset)
    const [timeInSeconds, setTimeInSeconds] = useState<number>(0);

    // sets the interval at which seconds increase
    const [secondCount, setSecondCount] = useState<number>(0);

    // this holds an array of laps so that laps can be recorded & displayed in LappedTime component
    const [lappedTime, setLappedTime] = useState<number[]>([]);

    // saves the timeInSeconds of when the lap button was last clicked so that we can calculate the current lap when needed
    const [pastLaps, setPastLaps] = useState<number>(0);

    const handleStartButton = (): void => {
        
        if (stopWatchCounting === false) {let second:any = setInterval(():void => {
            setTimeInSeconds((previousState:number) =>
                previousState + 1)
        }, 1000);
        setSecondCount(second);
        setStopWatchCounting(true)
        } 

        else {
            return
        }
    }

    const handleStopButton = (): void => {
        clearInterval(secondCount);
        setStopWatchCounting(false);
    }

    const handleResetButton = (): void => {
        clearInterval(secondCount);
        setTimeInSeconds(0);
        setLappedTime([]);
        setPastLaps(0);
        setStopWatchCounting(false);
    }

    const handleLapButton = (): void => {
        const currentLap: number = timeInSeconds - pastLaps;

        setLappedTime([...lappedTime, currentLap]);
        setPastLaps(timeInSeconds);
    }

    return(
        <div className='main_container'>
            <h1 className='main_heading'>⏰ Meredith's Stopwatch ⏰</h1>
            <StopWatch 
                timeInSeconds={timeInSeconds}
                />
            <StopWatchButton 
                timeInSeconds={timeInSeconds}
                lappedTime={lappedTime}
                stopWatchCounting={stopWatchCounting}
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