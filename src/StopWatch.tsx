import React, { useState, useEffect } from "react";
import StopwatchButton from "./StopWatchButton";
import LapDataTable from "./LapTable";
import "./Stopwatch.css";
// I was inspired by Andrew Chen, he was one of the earlier applicants to submit his code and I saw that he used polaris and shopify components, so I thought
// I'd try them as well, for my own twist, I also added a export to csv button
const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [laps, setLaps] = useState([]);

    useEffect(() => {
        let interval: any = null;

        if (isActive) {
            interval = setInterval(() => {
                setTime((time) => time + 25);
            }, 25);
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

    const handleReset = () => {
        setTime(0);
        setLaps([]);
        setIsActive(false);
    };

    const handleLap = () => {
        const lastLapTime = laps.length > 0 ? laps[laps.length - 1].lapTime : 0;
        const currentLapTime = time;
        const diff = currentLapTime - lastLapTime;

        setLaps([...laps, { lapTime: currentLapTime, diff }]);
    };
    return (
        <div className="stopwatch-container">
            <div>
                <h1 className="header">Stopwatch App</h1>
            </div>

            <div className="timer ">
                {new Date(time).toISOString().substring(14, 22)}
            </div>

            <div className="buttons-container">
                <StopwatchButton onClick={handleStart} label="Start" />
                <StopwatchButton onClick={handleStop} label="Stop" />
                <StopwatchButton onClick={handleReset} label="Reset" />
                <StopwatchButton onClick={handleLap} label="Lap" />
            </div>
            <div className="laps-container" data-testid="lap-list">
                <LapDataTable laps={laps} />
            </div>
        </div>
    );
};

export default Stopwatch;
