import React from 'react'
import { useState, useEffect } from 'react'
import StopWatchButton from './StopWatchButton';
import "../assets/css/StopWatch.css";
import LapsList from './LapsList';

export default function StopWatch() {
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [laps, setLaps] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [prevTimeElapsed, setPrevTimeElapsed] = useState(0);
    const [maxLapTime, setMaxLapTime] = useState(0);
    const [minLapTime, setMinLapTime] = useState(Number.MAX_VALUE);

    useEffect(() => {
        const startingTime = Date.now() - timeElapsed;
        let timer: NodeJS.Timeout;
        if (isRunning) {
            // while the time is running, the screen will display each millisecond passing
            timer = setInterval(() => setTimeElapsed(Date.now() - startingTime), 10);
        }

        return () => clearInterval(timer);
    }, [isRunning]);

    // sets the status of the timer
    const isRunningHandler = () => {
        setIsRunning(isRunning => !isRunning);
    }

    // deteremines the new best and worst times, and adds another lap 
    const lapsHandler = () => {
        setLaps([timeElapsed - prevTimeElapsed, ...laps]);
        setMaxLapTime(Math.max(maxLapTime, timeElapsed - prevTimeElapsed));
        setMinLapTime(Math.min(minLapTime, timeElapsed - prevTimeElapsed));
        setPrevTimeElapsed(timeElapsed);
    }

    // resets all entries so users can restart their stopwatch process
    const resetHandler = () => {
        setLaps([]);
        setTimeElapsed(0);
        setPrevTimeElapsed(0);
        setIsRunning(false);
        setMaxLapTime(0);
        setMinLapTime(Number.MAX_VALUE);
    }

    const getTimeFormatHelper = (time: number): string => {
        // there are 3600000ms in 1 hour
        const hours = String(Math.floor(time / 3600000)).padStart(2, '0');
        // there are 60000ms in 1 minute, and mod by 60 to get the remaining number of minutes after converting to hours
        const minutes = String(Math.floor(time / 60000 % 60)).padStart(2, '0');
        // there are 1000ms in 1 second, and mod by 60 go get the remaining number of seconds after converting to minutes
        const seconds = String(Math.floor(time / 1000 % 60)).padStart(2, '0');
        const milliseconds = String(Math.floor((time % 1000) / 10)).padStart(2, '0');

        // only display hours digits if it reaches 1 hour
        return `${(hours == '00' ? '' : hours + ':')}${minutes}:${seconds}.${milliseconds}`;
    }

    return (
        <div className='stopwatch-container'>
            <div className='title'>STOPWATCH</div>
            <div className='time-display'>{getTimeFormatHelper(timeElapsed)}</div>
            <StopWatchButton
                isRunningHandler={isRunningHandler}
                lapsHandler={lapsHandler}
                resetHandler={resetHandler}
                isRunning={isRunning} />
            <LapsList
                getTimeFormatHelper={getTimeFormatHelper}
                minLapTime={minLapTime}
                maxLapTime={maxLapTime}
                laps={laps} />
        </div>
    )
}