import React from 'react'
import { useState, useEffect } from 'react'
import StopWatchButton from './StopWatchButton';
import "./assets/css/StopWatch.css";

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
            timer = setInterval(() => setTimeElapsed(Date.now() - startingTime), 1)
        }

        return () => clearInterval(timer)
    }, [isRunning]);


    const isRunningHandler = () => {
        setIsRunning(isRunning => !isRunning);
    }

    const lapsHandler = () => {
        laps.unshift(timeElapsed - prevTimeElapsed)
        setLaps(laps);
        setMaxLapTime(Math.max(maxLapTime, timeElapsed - prevTimeElapsed))
        setMinLapTime(Math.min(minLapTime, timeElapsed - prevTimeElapsed))
        setPrevTimeElapsed(timeElapsed);
    }

    const resetHandler = () => {
        setLaps([]);
        setTimeElapsed(0);
        setPrevTimeElapsed(0);
        setIsRunning(false);
        setMaxLapTime(0);
        setMinLapTime(Number.MAX_VALUE);
    }

    const getTimeFormatHelper = (time: number): string => { // double check these functinos --> 60 
        const hours = String(Math.floor(time / 3600000)).padStart(2, '0') // double check this one
        const minutes = String(Math.floor(time / 60000 % 60)).padStart(2, '0')
        const seconds = String(Math.floor(time / 1000 % 60)).padStart(2, '0')
        const milliseconds = String(Math.floor((time % 1000) / 10)).padStart(2, '0')

        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    return (
        <div className='stopwatch'>
            <div className='title'>STOPWATCH</div>
            <div className='time-display'>{getTimeFormatHelper(timeElapsed)}</div>
            <StopWatchButton isRunningHandler={isRunningHandler} lapsHandler={lapsHandler} resetHandler={resetHandler} isRunning={isRunning} />
            <div className="lap-container">{laps.map((lapTime, i) =>
                <div className="lap-details">
                    <div>{`Lap ${laps.length - i}`}</div>
                    <div>{getTimeFormatHelper(lapTime)}</div>
                </div>)}
            </div>
        </div>
    )
}