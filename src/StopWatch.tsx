import React, { useState, useEffect} from 'react'
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false); // considered true if start button is pressed and considered false if stopped
    const [laps, setLaps] = useState([]);

    /*
    This useEffect is triggered three times:
        onMount: it checks if the time is active (start button is pressed or not)
        isActive state: every time start button or stop button is clicked, it triggers and conditionally determines whether to start a new interval or clear one
        time state: time is updated 
    */
    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;

        if (isActive) {
            interval = setInterval(() => {
                setTime(time => time + 10);
            }, 10);
            // 1000 is 1 second, therefore every 10 milliseconds, we update the time so it looks fast

        } else if (!isActive && time !== 0) {
            // if time is 0, there is no interval to clear, 
            // if the stop button is clicked (making isActive false) and time is not zero, we clear the interval. 
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, time]);

    const handleStart = () => {
        isActive === false ? setIsActive(true) : null 
        // on the click of the start button, we want to create a new interval so we set isActive to true
    };

    const handleStop = () => {
        isActive === true ? setIsActive(false) : null
        // on the click of the stop button, we want to clear the interval so we set isActive to false

    };

    const handleReset = () => {
        setTime(0);
        setLaps([]);
    };

    const handleLap = () => {
        setLaps([...laps, time]); // update with the current time
    };

    const formatTime = (time: number) => {
        // time is in miillseconds so we have to floor the resulting value 
        const minutes = Math.floor((time / 60000) % 60);
        const seconds = Math.floor((time / 1000) % 60);
        const centiseconds = Math.floor((time / 10) % 100);
    
        const formattedMinutes = ("0" + minutes).slice(-2);
        const formattedSeconds = ("0" + seconds).slice(-2);
        const formattedCentiseconds = ("0" + centiseconds).slice(-2);
    
        return `${formattedMinutes}:${formattedSeconds}:${formattedCentiseconds}`;
    };

    return (
        <div>
            <h1>{formatTime(time)}</h1>
            <StopWatchButton onClick={handleStart}>Start</StopWatchButton>
            <StopWatchButton onClick={handleStop}>Stop</StopWatchButton>
            <StopWatchButton onClick={handleReset}>Reset</StopWatchButton>
            <StopWatchButton onClick={handleLap}>Lap</StopWatchButton>

            {laps.length > 0 && (
                <ul>
                    {laps.map((lap, index) => (
                        <li key={index}>
                            Lap {index + 1}: {("0" + Math.floor((lap / 60000) % 60)).slice(-2)}:{("0" + Math.floor((lap / 1000) % 60)).slice(-2)}:{("0" + ((lap / 10) % 100)).slice(-2)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}