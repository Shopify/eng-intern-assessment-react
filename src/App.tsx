import React, { useCallback, useRef, useState } from 'react';
import './styles.css';
import StopWatch from './stopwatch/StopWatch';
import StopWatchButton from './stopwatch-button/StopWatchButton';

export default function App() {
    // Stopwatch state
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0.0);
    const intervalId = useRef<NodeJS.Timer>();

    const toggleRunning = useCallback(() => {
        if (!isRunning) {
            // Start stopwatch
            setIsRunning(true);
            intervalId.current = setInterval(() => setElapsedTime((previous) => previous + 0.01), 10);
        }
        else {
            // Pause stopwatch
            setIsRunning(false);
            clearInterval(intervalId.current);
        }
    }, [isRunning]);

    const resetStopwatch = useCallback(() => {
        setElapsedTime(0.0);
    }, []);

    return (
        <div className="page">
            <StopWatch elapsedTime={elapsedTime} laps={0} />
            <StopWatchButton onClick={toggleRunning}>{isRunning ? 'Stop' : 'Start'}</StopWatchButton>
            <StopWatchButton onClick={resetStopwatch}>Reset</StopWatchButton>
        </div>
    );
}
