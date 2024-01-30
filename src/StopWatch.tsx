import React, { useState, useEffect, useRef } from 'react'
import StopWatchButton from './StopWatchButton'

// Function to format time in mm:ss:ms format, includes hours if reached
export function formatTime(time: number): string {
    // Calculate hours, minutes, seconds, and milliseconds
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const milliseconds = time % 100;

    // Return formatted time. Hours are included only if they are greater than 0.
    return `${hours > 0 ? `${hours.toString().padStart(2, '0')}:` : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}
export default function StopWatch() {
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [lapTimes, setLapTimes] = useState([]);
    const intervalRef = useRef<NodeJS.Timer | null>(null);


    const handleReset = () => {
        setTimerOn(false);
        setTime(0);
        setLapTimes([]);
    };

    useEffect(() => {
        if (timerOn) {
            intervalRef.current = setInterval(() => {
                setTime(time => time + 1);
            }, 10);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [timerOn]);

    return (
        <div className='stopwatch'>
            <h1 className='stopwatch-title'>StopWatch</h1>
            <div className='stopwatch-content'>
                <div className='stopwatch-buttons'>
                    <StopWatchButton type={'start'} onClick={() => setTimerOn(true)}></StopWatchButton>
                    <StopWatchButton type={'stop'} onClick={() => setTimerOn(false)}></StopWatchButton>
                    <StopWatchButton type={'lap'} onClick={() => setLapTimes([...lapTimes, time])} timerOn={timerOn} lapTimes={lapTimes}></StopWatchButton>
                    <StopWatchButton type={'reset'} onClick={handleReset} time={time}></StopWatchButton>
                </div>
                <div className='stopwatch-time'>
                    <p>{formatTime(time)}</p>
                    {/* Display the numbered lap times */}
                    {lapTimes.length > 0 && (
                        <div className='stopwatch-laptimes'>
                            <p>Lap times</p>
                            <ul>
                                {lapTimes.map((lapTime, index) => {
                                    return <li key={index}>{(index + 1) + '.'} {formatTime(lapTime)}</li>
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}