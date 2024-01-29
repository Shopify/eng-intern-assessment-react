import React, { useState } from 'react';
import './CSS Files/Button.css';
import './App';

// Define props type for the component
type Props = {
    setTimeInSeconds: Function;
    handleLap: React.MouseEventHandler<HTMLButtonElement>; // Correct type for onClick handler
};

// Stopwatch button component with handlers for start, stop, reset, and lap functionality
export default function StopWatchButton(props: Props) {
    const { setTimeInSeconds, handleLap } = props;


    // State to hold the interval ID for clearing the interval on stop/reset
    const [intervalId, setIntervalId] = useState<number>(0);

    // Starts the stopwatch by incrementing the timeInSeconds every 1000ms (1 second)
    const handleStartButton = () => {
        let interval: any = setInterval(() => {
            setTimeInSeconds((previousState: number) => previousState + 1);
        }, 1000);
        setIntervalId(interval);
    };

    // Stops the stopwatch by clearing the interval using the stored interval ID
    const handleStopButton = () => {
        clearInterval(intervalId);
    };

    // Resets the stopwatch to 0 and clears the interval
    const handleResetButton = () => {
        clearInterval(intervalId);
        setTimeInSeconds(0);
    };
    // Render stopwatch control buttons
    return (
        <section className='ButtonContainer'>
            <button onClick={handleStartButton}>Start</button>
            <button onClick={handleStopButton}>Stop</button>
            <button onClick={handleResetButton}>Reset</button>
            <button onClick={handleLap}>Lap</button>
        </section>
    );
}
