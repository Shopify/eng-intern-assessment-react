import React, { useState, useEffect, useCallback } from 'react'
import StopWatchButton from './StopWatchButton'
import { maxLaps } from './StopWatchButton';

// Function to format the time. This is necessary since both the time and lap times need to be formatted
export function formatTime(time: number): string {
    // Format the time in mm:ss:ms. Display hours only if reached
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const milliseconds = time % 100;
    // Format the minutes, seconds, and milliseconds to be two digits
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMilliseconds = milliseconds.toString().padStart(2, '0');
    // If stopwatch reaches at least an hour, display the hours
    if (hours > 0) {
        const formattedHours = hours.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
    }
    // Combine the values into a string
    const formattedTime = `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
    return formattedTime;
}

export default function StopWatch() {
    // State to track the time, whether the timer is on/off, and the lap times
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [lapTimes, setLapTimes] = useState<number[]>([]);

    // Stops the timer, resets the time, and clears the lap times. useCallback is used to prevent unnecessary re-renders
    const handleReset = useCallback(() => {
        setTimerOn(false); 
        setTime(0); 
        setLapTimes([]);
      }, []);

    // Triggered when the "Start" button is clicked. Sets the 'timerOn' state to true, which starts the timer.
    const handleStart = () => setTimerOn(true);

    // Triggered when the "Stop" button is clicked. Sets the 'timerOn' state to false, which stops the timer.
    const handleStop = () => setTimerOn(false);

    const handleLap = () => {
        if (!timerOn || lapTimes.length >= maxLaps) return; // Checks if timer is running and maximum lap limit has not been exceeded
        setLapTimes([...lapTimes, time]); // Adds the current time to the lapTimes array
    };

    // Every time timerOn changes, we start or stop the timer
    // useEffect is necessary since setInterval changes the state and we don't want to create an infinite loop
    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;

        if (timerOn) {
            interval = setInterval(() => setTime(time => time + 1), 10)
        }

        return () => {clearInterval(interval)} // Clears the interval when the component unmounts or timerOn changes
    }, [timerOn])

    return(
        <div className='stopwatch'>
            <h1 className='stopwatch-title'>StopWatch</h1>
            <div className='stopwatch-content'>
                <div className='stopwatch-buttons'>
                    <StopWatchButton type={'start'} onClick={handleStart}></StopWatchButton>
                    <StopWatchButton type={'stop'} onClick={handleStop}></StopWatchButton>
                    <StopWatchButton type={'lap'} onClick={handleLap} timerOn={timerOn} lapTimes={lapTimes}></StopWatchButton>
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
                                    return <li key={index}>{(index + 1)+'.'} {formatTime(lapTime)}</li>
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}