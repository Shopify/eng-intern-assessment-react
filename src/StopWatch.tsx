import React, { useState, useEffect } from 'react'
import StopWatchButton from './StopWatchButton'

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
    // State for the time, whether the timer is on/off, and the lap times
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [lapTimes, setLapTimes] = useState<number[]>([]);

    // Stops the timer, resets the time, and clears the lap times
    const handleReset: () => void = () => {
        setTimerOn(false); 
        setTime(0); 
        setLapTimes([]);
    }

    // Records the lap time and prevents more than 25 lap times from being recorded
    const handleLap: () => void = () => {
        if (lapTimes.length < 25) {
            setLapTimes([...lapTimes, time]);
        } else {
            alert('You have reached the maximum number of lap times.');
        }
    }

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
        <div>
            <h1>StopWatch</h1>
            <p>{formatTime(time)}</p>
            <StopWatchButton type={'start'} onClick={() => setTimerOn(true)}></StopWatchButton>
            <StopWatchButton type={'stop'} onClick={() => setTimerOn(false)}></StopWatchButton>
            <StopWatchButton type={'lap'} timerOn={timerOn} onClick={handleLap}></StopWatchButton>
            <StopWatchButton type={'reset'} onClick={handleReset}></StopWatchButton>
            {/* Display the lap times */}
            <ul>
                {lapTimes.map((lapTime, index) => {
                    return <li key={index}>{formatTime(lapTime)}</li>
                })}
            </ul>
        </div>
    )
}