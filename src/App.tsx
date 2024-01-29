import React, { useState, useRef } from 'react';
import Stopwatch from './components/StopWatch';
import StopWatchButton from './components/StopWatchButton';
import Footer from './components/Footer';
import './styles.css';

export default function App() {
    // State variables to track time, running state, and laps
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const timerId = useRef<NodeJS.Timeout | null>(null);

    const handleStartStop = () => {
        if (isRunning) {
            // Stop the stopwatch
            setIsRunning(false);
            if (timerId.current) clearInterval(timerId.current);
        } else {
            // Start the stopwatch
            setIsRunning(true);
            const startTime = Date.now() - time;
            // Update the time every 10 milliseconds
            timerId.current = setInterval(() => {
                setTime(Date.now() - startTime);
            }, 10);
        }
    };

    const handleResetLap = () => {
        if (isRunning) {
            // Record a lap time
            setLaps([...laps, time]);
        } else {
            // Reset the stopwatch and laps
            setTime(0);
            setLaps([]);
        }
    };

    return (
        <div className="container">
            <Stopwatch time={time} laps={laps} />
            <StopWatchButton
                isRunning={isRunning}
                onStartStop={handleStartStop}
                onResetLap={handleResetLap}
            />
            <Footer />
        </div>
        
    );
}