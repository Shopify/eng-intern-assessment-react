import React, { useState, useEffect } from 'react';
import StopWatchButton from '../StopWatchButton/StopWatchButton';
import ClearButton from '../ClearButton/ClearButton';
import LapButton from '../LapButton/LapButton';
import "./StopWatch.css";

export default function StopWatch() {
    // State for tracking whether the stopwatch is running
    const [isRunning, setIsRunning] = useState(false);
    // State for tracking the elapsed time
    const [time, setTime] = useState(0);
    // State for tracking the recorded laps
    const [laps, setLaps] = useState<number[]>([]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        // Start the timer when the stopwatch is running
        if (isRunning) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10); // Increment time every 10ms
            }, 10);
        } else {
            clearInterval(interval); // Clear interval when stopwatch stops
        }
        return () => clearInterval(interval); // Clean up interval on component unmount
    }, [isRunning]);

    // Function to delete a lap
    const deleteLap = (index: number) => {
        setLaps(laps.filter((_, lapIndex) => lapIndex !== index));
    };

    return (
        <div className="stopwatch">
            {/* Display the time */}
            <div className="time-display">
                {new Date(time).toISOString().slice(14, 22)}
            </div>
            {/* Container for the Start/Stop button */}
            <div className="buttons-container">
                <StopWatchButton isRunning={isRunning} setIsRunning={setIsRunning} />
            </div>
            {/* Container for Lap and Reset buttons */}
            <div className="buttons-container">
                <LapButton time={time} laps={laps} setLaps={setLaps} isDisabled={time === 0 || !isRunning}/>
                <ClearButton setTime={setTime} setLaps={setLaps} setIsRunning={setIsRunning} />
            </div>
            {/* List of recorded laps */}
            <ul className="laps">
                {laps.map((lap, index) => (
                    <li key={index} className="lap-item">
                        {new Date(lap).toISOString().slice(14, 22)}
                        {/* Button to delete a lap */}
                        <button className="delete-button" onClick={() => deleteLap(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
