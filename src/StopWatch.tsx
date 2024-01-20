import React, { useEffect, useRef, useState } from 'react'
import StopWatchButton from './StopWatchButton'


const StopWatch: React.FC = () => {
    // State variables for managing stopwatch functionality
    const [isRunning, setIsRunning] = useState(false)
    const [time, setTime] = useState(0)
    const [laps, setLaps] = useState<number[]>([]);


    //Effect to handle the timer logic when the component mounts or is updated
    useEffect(() => {
        let interval: NodeJS.Timeout;

        // Start or stop the interval based on the isRunning state
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isRunning]);


    // Function to start the stopwatch
    const start = () => {
        setIsRunning(true);
    }

    // Function to stop the stopwatch
    const stop = () => {
        setIsRunning(false);
    }
    
    // Function to reset the stopwatch
    const reset = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    }


    // Function to add a lap to the list
    const addLap = () => {
        setLaps((prevLaps) => [...prevLaps, time])
    }

    // Function to format the time in HH:MM:SS.rms format
    const formatTime = (milliseconds: number): string => {

        const hours = Math.floor(milliseconds / 3600000)
        const minutes = Math.floor((milliseconds % 3600000) / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000)
        const remainingMilliseconds = milliseconds % 1000;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
            seconds
        ).padStart(2, '0')}.${String(remainingMilliseconds).padStart(3, '0')}`;
    }

    // Render the stopwatch component
    return (
        <div>
            <h1>Stopwatch</h1>
            <div>
                <p>{formatTime(time)}</p>
                {/* Buttons to control the stopwatch */}
                <StopWatchButton onClick={start} disabled={isRunning} label="Start" />
                <StopWatchButton onClick={stop} disabled={!isRunning} label="Stop" />
                <StopWatchButton onClick={addLap} disabled={!isRunning} label="Lap" />
                <StopWatchButton onClick={reset} label="Reset" />
            </div>
            <div>
                {/* Display the list of laps */}
                <h2>Laps</h2>
                <ul>
                    {laps.map((lap, index) => (
                        <li key={index}>{`Lap ${index + 1}: ${formatTime(lap)}`}</li>
                    ))}
                </ul>
            </div>
        </div>
    )


}

export default StopWatch;