import React, { useEffect, useState } from 'react';
import StopWatch from './StopWatch';
import './css/App.css';
import StopWatchButton from './StopWatchButton';

export default function App() {
    // State variables for managing stopwatch functionality
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [reset, setReset] = useState<boolean>(false);
    const [time, setTime] = useState<number>(0);
    const [timeDisplay, setTimeDisplay] = useState<Array<number | string>>([]);
    const [laps, setLaps] = useState<Array<number>>([]);

    // Converts time in seconds to a displayable format (HH:MM:SS)
    const convertTimeToDisplay = (time: number): (number | string)[] => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time - hours * 3600) / 60);
        const seconds = time - minutes * 60 - hours * 3600;
        return [
            hours < 10 ? `0${hours}` : hours,
            minutes < 10 ? `0${minutes}` : minutes,
            seconds < 10 ? `0${seconds}` : seconds
        ];
    }

    // Handles the start button click, sets isRunning to true and initializes laps if the timer has not started
    const handleOnStart = () => {
        setIsRunning(true);
        if (time === 0) {
            initializeLaps();
        }
    }

    // Handles the stop button click, sets isRunning to false to pause the timer
    const handleOnStop = () => {
        setIsRunning(false);
    }

    // Handles the reset button click, sets reset to true triggering a reset in useEffect
    const handleReset = () => {
        setReset(true);
    }

    // Initializes laps with time set to 0
    const initializeLaps = () => {
        setLaps([0]);
    }

    // Handles the lap button click, adds the current time to the laps array
    const handleLap = () => {
        if (time !== 0) {
            setLaps((prevLaps) => [...prevLaps, time]);
        }
    }

    // useEffect to manage timer logic and updates
    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        // Increment time every 1000ms if isRunning is true
        if (isRunning) {
            intervalId = setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
        } else {
            clearInterval(intervalId); // Stop the timer if isRunning is false
        }

        // Reset the timer, laps, and display when reset is true
        if (reset) {
            setIsRunning(false);
            setTime(0);
            setReset(false);
            setLaps([]);
        }

        // Update time display
        setTimeDisplay(convertTimeToDisplay(time));

        // Cleanup: clear the interval to avoid memory leaks
        return () => {
            clearInterval(intervalId);
        };
    }, [reset, isRunning, time]);

    // App display with Stopwatch, buttons, and lap list
    return (
        <div className='stopwatch-container'>
            <StopWatch timeDisplay={timeDisplay} />
            <div className='stopwatch-button-container'>
                <StopWatchButton type={'Start'} onClick={handleOnStart} />
                <StopWatchButton type={'Stop'} onClick={handleOnStop} />
                <StopWatchButton type={'Reset'} onClick={handleReset} />
                <StopWatchButton type={'Lap'} onClick={handleLap} />
            </div>
            <div>
                <ul className='lap-list'>
                    {laps.map((lap, index, array) => (
                        <li key={index} style={{ listStyle: 'None', color: 'whitesmoke' }}>
                            {index > 0 ? `Lap ${index}: ${lap - array[index - 1]} seconds` : ''}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
