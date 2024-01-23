import React, { useState, useRef } from "react";
import StopwatchButton from "./StopwatchButton";
import Stopwatch from "./Stopwatch";

export default function App() {
    const [isStart, setIsStart] = useState<boolean>(true);
    const [time, setTime] = useState<number>(0);
    const [laps, setLaps] = useState<number[]>([]);
    const interval = useRef<NodeJS.Timeout | null>(null);

    // Handles start and stop button functionality
    const handleStartAndStop = () => {
        if (isStart) {
            setIsStart(false);
            interval.current = setInterval(() => {
                setTime((prevTime) => prevTime + 0.01);
            }, 10);
        } else {
            setIsStart(true);
            clearInterval(interval.current);
        }
    };

    // Handles reset button functionality
    const handleReset = () => {
        setIsStart(true);
        setTime(0);
        setLaps([]);
        clearInterval(interval.current);
    };

    // Handles lap button functionality
    const handleLap = () => {
        const newLap = time;

        setTimeout(() => {
            setLaps((prevLaps) => [...prevLaps, newLap]);
        }, 0);
    };

    return (
        <div>
            <StopwatchButton
                onLap={handleLap}
                onStartStop={handleStartAndStop}
                onReset={handleReset}
                isStart={isStart}
            />
            <Stopwatch time={time} laps={laps} />
        </div>
    );
}
