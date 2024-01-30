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
    const lastTime = useRef(0);
    const intervalId = useRef<NodeJS.Timer>();

    // Laps
    const [laps, setLaps] = useState<string[]>([]);

    // Button handlers
    const toggleRunning = useCallback(() => {
        if (!isRunning) {
            // Start stopwatch
            setIsRunning(true);
            lastTime.current = Date.now();
            intervalId.current = setInterval(() => {
                // We need a system that works based off the last recorded time & current time because
                // browsers will not allow setInterval to run in the background, effectively pausing stopwatches
                // if they simply used a 'elapsedTime += 0.01' approach (like I did originally)
                const currentTime = Date.now();
                const elapsedTime = (currentTime - lastTime.current) / 1000;
                setElapsedTime((prevState) => prevState + elapsedTime)
                lastTime.current = currentTime;
            }, 10); // Stopwatch logic
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

            {/* Top, empty section */}
            <div className="section" />

            {/* Main content section */}
            <div className="section">
                <div className="stopwatchContent">
                    {/* Stopwatch timer */}
                    <StopWatch elapsedTime={elapsedTime} laps={0}/>
                    {/* Stopwatch buttons */}
                    <div className="buttons">
                        <StopWatchButton onClick={toggleRunning}>
                            {isRunning ? 'Stop' : 'Start'}
                        </StopWatchButton>
                        <StopWatchButton onClick={resetStopwatch}>
                            Reset
                        </StopWatchButton>
                        <StopWatchButton onClick={addLap}>
                            Lap
                        </StopWatchButton>
                    </div>
                </div>
            </div>

            {/* Bottom section, contains laps box */}
            <div className="section">
                {laps.length > 0 && <LapsBox laps={laps} />}
            </div>

        </div>
    );
}
