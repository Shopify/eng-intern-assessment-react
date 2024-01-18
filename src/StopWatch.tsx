import React, { useEffect } from 'react'
import { useState } from 'react';
import StopWatchButton from './StopWatchButton';

// Represents the stopwatch display
export default function StopWatch() {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [laps, setLaps] = useState<{lap: number; time: number;}[]>([]);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [currLapTime, setCurrLapTime] = useState<number>(0);

    useEffect(() => {
        let intervalID: NodeJS.Timer;
        if (isRunning) {
            intervalID = setInterval(() => {
                setElapsedTime((prevElapsedTime) => prevElapsedTime+10);
                setCurrLapTime((prevLapTime) => prevLapTime+10);
            }, 10);
        } else {
            clearInterval(intervalID);
        }
        return () => {clearInterval(intervalID);}
    }, [isRunning])

    const handleStart = () => {
        setIsStarted(true);
        setIsRunning(true);
    };

    const handleStop = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setIsStarted(false);
        setLaps([]);
        setElapsedTime(0);
    };

    const handleLap = () => {
        const totalLapTimes = laps.reduce((total, lap) => total + lap.time, 0);
        setLaps((prevLaps) => [{lap: laps.length+1, time: elapsedTime-totalLapTimes}, ...prevLaps])
        setCurrLapTime(0)
    };

    const formatTime = (time: number) => {
        const milliseconds = Math.floor(time % 1000) / 10;
        const seconds = Math.floor(time/1000) % 60;
        const minutes = Math.floor(time/(1000 * 60)) % 60;

        const formattedTime = `${padZero(minutes)}:${padZero(seconds)}:${padZero(milliseconds)}`;

        return formattedTime;
    };

    const padZero = (time: number) => {
        if (time < 10) {
            return '0' + time;
        } else {
            return time;
        }
    };

    return(
        <div className='app-container'>
            <div className='timer-container'>
                <h1 className='timer'>{formatTime(elapsedTime)}</h1>
            </div>
            <StopWatchButton 
                isRunning={isRunning}
                handleStart={handleStart}
                handleStop={handleStop}
                handleReset={handleReset}
                handleLap={handleLap}
            />
            <div className='lap-container'>
                {isStarted ? (
                    <div className='lap-item'>Lap: {laps.length+1}: {formatTime(currLapTime)}</div>
                ) : (
                    <></>
                )}
                {laps.map((lap) => {
                    return (
                        <div className='lap-item' key={lap.lap}>Lap {lap.lap}: {formatTime(lap.time)}</div>
                    );
                })}
            </div>
        </div>
    )
}