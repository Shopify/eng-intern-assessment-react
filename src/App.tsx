import React, { useState } from 'react';
import Stopwatch from './StopWatch';
import StopWatchButton from './StopWatchButton';

export default function App() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);

    // Start or Stop button click handler
    const handleStartStop = () => {
        if (isRunning) {
            // Stop the stopwatch
            setIsRunning(false);
            clearInterval(timerId);
        } else {
            // Start the stopwatch
            setIsRunning(true);
            const startTime = Date.now() - time;
            timerId = setInterval(() => {
                setTime(Date.now() - startTime);
            }, 1000);
        }
    };

    // Reset or Lap button click handler
    const handleResetLap = () => {
        if (isRunning) {
            // Record a lap
            setLaps([...laps, time]);
        } else {
            // Reset the stopwatch
            setTime(0);
            setLaps([]);
        }
    };

    let timerId: NodeJS.Timeout;

    return (
        <div>
            <Stopwatch time={time} laps={laps} />
            <StopWatchButton 
                isRunning={isRunning}
                onStartStop={handleStartStop}
                onResetLap={handleResetLap}
            />
        </div>
    );
}
