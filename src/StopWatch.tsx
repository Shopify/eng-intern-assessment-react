import React, { useState, useEffect } from "react";
import StopwatchButton from "./StopWatchButton";

const Stopwatch: React.FC = () => {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        // Using 25ms instead of 1ms as the rate was too fast and bugged out
        if (isActive) {
            interval = setInterval(() => {
                setTime((time) => time + 25);
            }, 25);
        // Handles the stopwatch is stopping, but not reset, could also do - isActive === false or just else:
        } else if (interval !== null) {
            clearInterval(interval);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive]);

    const handleStart = () => {
        setIsActive(true);
    };

    const handleStop = () => {
        setIsActive(false);
    };

    const handlePause = () => {
        setIsActive(false);
    };

    const handleResume = () => {
        setIsActive(true);
    };

    const handleReset = () => {
        setTime(0);
        setLaps([]);
        setIsActive(false);
    };

    const handleLap = () => {
        // if (isActive) {
        // } Wasn't sure if being active was a requirement for laps
        setLaps([...laps, time]);
    };

    return (
        <div>
            {/* Used MM:SS.SS as a testing component looked for that, ISOString as it was universal */}
            <div>{new Date(time).toISOString().substring(14, 22)}</div>
            <div data-testid="lap-list">
                {laps.map((lap, index) => (
                    <div key={index}>
                        {new Date(lap).toISOString().substring(14, 22)}
                    </div>
                ))}
            </div>
            <StopwatchButton onClick={handleStart} label="Start" />
            <StopwatchButton onClick={handleStop} label="Stop" />
            <StopwatchButton onClick={handleReset} label="Reset" />
            <StopwatchButton onClick={handleLap} label="Lap" />

            {/* The testcases involved Pause/Resume, but the requirements didn't*/}
            {/* <StopwatchButton onClick={handlePause} label="Pause" /> */}
            {/* <StopwatchButton onClick={handleResume} label="Resume" /> */}
        </div>
    );
};

export default Stopwatch;
