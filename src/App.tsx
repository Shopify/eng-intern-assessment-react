import React, { useCallback, useRef, useState } from 'react';
import './globals.css'
import './styles.css';
import StopWatch from './stopwatch/StopWatch';
import StopWatchButton from './stopwatch-button/StopWatchButton';
import formatTime from "./formatTime";
import LapsBox from "./laps-box/LapsBox";

export default function App() {
    // Stopwatch state
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0.0);
    const intervalId = useRef<NodeJS.Timer>();

    // Laps
    const [laps, setLaps] = useState<string[]>([]);

    const toggleRunning = useCallback(() => {
        if (!isRunning) {
            // Start stopwatch
            setIsRunning(true);
            intervalId.current = setInterval(() => setElapsedTime((previous) => previous + 0.01), 10); // Stopwatch logic
        }
        else {
            // Pause stopwatch
            setIsRunning(false);
            clearInterval(intervalId.current); // Ensure stopwatch doesn't keep increasing
        }
    }, [isRunning]);

    const resetStopwatch = useCallback(() => {
        // Reset states back to default
        setElapsedTime(0.0);
        setLaps([]);
    }, []);

    const addLap = useCallback(() => {
        // Don't do anything if timer isn't running
        if (!isRunning) return;

        // Add lap
        setLaps((previous) => [...previous, formatTime(elapsedTime)])
    }, [elapsedTime, isRunning])

    return (
        <div className="page">

            <div className="section" />

            <div className="section">
                <div className="stopwatchContent">
                    <StopWatch elapsedTime={elapsedTime} laps={0}/>
                    <div className="buttons">
                        <StopWatchButton onClick={toggleRunning} color="#b8edb4">
                            {isRunning ? 'Stop' : 'Start'}
                        </StopWatchButton>
                        <StopWatchButton onClick={resetStopwatch} color="#ebb4b0">
                            Reset
                        </StopWatchButton>
                        <StopWatchButton onClick={addLap} color="#ebb4b0">
                            Lap
                        </StopWatchButton>
                    </div>
                </div>
            </div>

            <div className="section">
                {laps.length > 0 && <LapsBox laps={laps} />}
            </div>

        </div>
    );
}
