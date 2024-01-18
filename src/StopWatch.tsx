import React, { useEffect } from 'react'
import { useState } from 'react';

import StopWatchButton from './StopWatchButton';

// Represents the stopwatch display
export default function StopWatch() {
    const [isRunning, setIsRunning] = useState<boolean>(false); // stopwatch is running
    const [isStarted, setIsStarted] = useState<boolean>(false); // stopwatch has started
    const [laps, setLaps] = useState<{lap: number; time: number;}[]>([]); // lap times in ms
    const [elapsedTime, setElapsedTime] = useState<number>(0); // in ms
    const [currLapTime, setCurrLapTime] = useState<number>(0); // in ms

    // find shortest and longest lap times in order to highlight them 
    let shortestLap: number;
    let longestLap: number;
    if (laps.length > 1) {
        shortestLap = Math.min(...laps.map((lap) => lap.time));
        longestLap = Math.max(...laps.map((lap) => lap.time));
    }

    // if stopwatch is running, we update the elapsed time every 10ms
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

    // formats time (ms) to a the format mm:ss:ms
    const formatTime = (time: number) => {
        const milliseconds = Math.floor(time % 1000) / 10;
        const seconds = Math.floor(time/1000) % 60;
        const minutes = Math.floor(time/(1000 * 60)) % 60;

        const formattedTime = `${padZero(minutes)}:${padZero(seconds)}:${padZero(milliseconds)}`;

        return formattedTime;
    };


    // helper function for format time that pads time with 0s
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
                <p className='timer'>{formatTime(elapsedTime)}</p>
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
                    <div className='lap-item'>
                        <div className='lap-number'>Lap {laps.length+1}:</div>
                        <div className='lap-time'>{formatTime(currLapTime)}</div>
                    </div>
                ) : (
                    <></>
                )}
                {laps.map((lap) => {
                    let className = 'lap-item';
                    if (lap.time === shortestLap) {
                        className += '-shortest'
                    }
                    if (lap.time === longestLap) {
                        className += '-longest'
                    }
                    return (
                        <div className={className} key={lap.lap}>
                            <div className='lap-number'>Lap {lap.lap}:</div>
                            <div className='lap-time'>{formatTime(lap.time)}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}