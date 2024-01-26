import React, { useEffect, useState } from 'react'
import StopWatchButton from './StopWatchButton'
import StopWatch from './StopWatch';


// start, stop, reset, lap

export default function App() {
    const [time, setTime] = useState(0);
    const [mappedTimes, setMappedTimes] = useState<Array<string>>([]);
    const [isRunning, setIsRunning] = useState(false);

    // reset buttom function
    const reset = () => {
        setTime(0);
        setIsRunning(false);
        setMappedTimes([]);
        alert("Timer reset to 0!")
    }

    // lap button function
    const lapTime = () => {
        setMappedTimes([...mappedTimes, `${hours}:${minutes}:${seconds}.${milliseconds}`]);
    }

    // start/stop button function
    const toggleIsRunning = () => {
        setIsRunning(!isRunning);
    }

    useEffect(() => {
        let interval: NodeJS.Timer;

        if (isRunning) {
            interval = setInterval(() => {
                setTime((time) => time + 1);
            }, 100);
        }

        return () => clearInterval(interval);
    }, [time, isRunning])


    //  hours
    const hours = Math.floor(time / 36000);
    // minutes
    const minutes = Math.floor((time - (hours * 36000)) / 600);
    // seconds
    const seconds = Math.floor((time - (hours * 36000) - (minutes * 600)) / 10);
    // tenths of a second (not actually a millisecond)
    const milliseconds = time - (hours * 36000) - (minutes * 600) - (seconds * 10);


    return(
        <div className='container'>
            <StopWatch hours={hours} minutes={minutes} seconds={seconds} milliseconds={milliseconds}></StopWatch>
            <div>
                <StopWatchButton onClick={toggleIsRunning} name={isRunning ? "Stop" : "Start"}></StopWatchButton>
                <StopWatchButton onClick={reset} name="Reset"></StopWatchButton>
                <StopWatchButton onClick={lapTime} name="Lap"></StopWatchButton>
            </div>
            {mappedTimes.map((t) => {
                return <div className='lap-container'>
                    <h3>Lap:</h3>
                    <p>{t}</p>
                </div>
            })}
        </div>
    )
}