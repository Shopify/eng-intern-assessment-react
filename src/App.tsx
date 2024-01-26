import React, { useState, useRef } from 'react';
import Stopwatch from './components/StopWatch';
import StopWatchButton from './components/StopWatchButton';
import './styles.css';

export default function App() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const timerId = useRef<NodeJS.Timeout | null>(null);

    const handleStartStop = () => {
        if (isRunning) {
            setIsRunning(false);
            if (timerId.current) clearInterval(timerId.current);
        } 
        else {
            setIsRunning(true);
            const startTime = Date.now() - time;
            timerId.current = setInterval(() => {
                setTime(Date.now() - startTime);
            }, 10); // Update interval set to 10 milliseconds            
        }
    };

    const handleResetLap = () => {
        if (isRunning) {
            setLaps([...laps, time]);
        } else {
            setTime(0);
            setLaps([]);
        }
    };

    return (
        <div className="container">
            <Stopwatch time={time} laps={laps} />
            <div className="stopwatch-controls">
                <StopWatchButton
                    isRunning={isRunning}
                    onStartStop={handleStartStop}
                    onResetLap={handleResetLap}
                />
            </div>
        </div>
    );
}