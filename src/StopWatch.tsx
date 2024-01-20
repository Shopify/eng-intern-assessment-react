import React, { useEffect, useState } from "react";
import StopWatchButton from "./StopWatchButton";

const formatTime = (time: number) => {
    const hours = Math.floor(time / 1000 / 60 / 60);
    const minutes = Math.floor(time / 1000 / 60) % 60;
    const seconds = Math.floor(time / 1000) % 60;

    return `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export default function StopWatch() {
    // Time in milliseconds
    const [time, setTime] = useState(0);
    // Current status of timer
    const [isRunning, setIsRunning] = useState(false);
    // List of lap times
    const [lapTimes, setLapTimes] = useState<number[]>([]);

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setTime(time + 1);
        }, 1);
        return () => clearInterval(interval);
    }, [time, isRunning]);

    return (
        <div>
            <h1>Stop Watch</h1>
            <p>{formatTime(time)}</p>
            <StopWatchButton
                setIsRunning={setIsRunning}
                isRunning={isRunning}
                reset={() => {
                    setTime(0)
                    setLapTimes([])
                }}
                addLapTime={() => setLapTimes([...lapTimes, time])}
            />
            <h3>Lap List</h3>
            <ol className="lap-list">
                {lapTimes.map((lapTime, index) => (
                    <li key={index}>{formatTime(lapTime)}</li>
                ))}
            </ol>
        </div>
    );
}
