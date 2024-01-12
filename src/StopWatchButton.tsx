import React, { useState, useRef } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';


export default function StopWatchButton() {
    const intervalIdRef = useRef<number | null>(null);

    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const [laps, setLaps] = useState<number[]>([]);

    const handleStartStopClick = () => {
        setIsRunning((prevIsRunning) => !prevIsRunning);

        if (!isRunning) {
            intervalIdRef.current = window.setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else {
            window.clearInterval(intervalIdRef.current);
        }
    };

    const handleLapClick = () => {
        setLaps((prevLaps) => [...prevLaps, time]);
    };

    const handleResetClick = () => {
        window.clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    };
    return (
        <div>
            <StopWatch time={time} laps={laps} />
            <StopWatchButton
                isRunning={isRunning}
                onStartStopClick={handleStartStopClick}
                onLapClick={handleLapClick}
                onResetClick={handleResetClick}
            />
        </div>
    )
}