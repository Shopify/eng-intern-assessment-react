import React, { useEffect, useState } from "react";
import StopWatchButton from "./StopWatchButton";

/**
 *
 * @param time Time in milliseconds
 * @returns A formatting string containing the hours, minutes, and seconds of time.
 */
const formatTime = (time: number) => {
    const hours = Math.floor(time / 1000 / 60 / 60);
    const minutes = Math.floor(time / 1000 / 60) % 60;
    const seconds = Math.floor(time / 1000) % 60;
    // I added milliseconds because I'm extremely passionate about stopwatches and timers, being a speedcuber myself.
    const milliseconds = time % 1000;

    return `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}.${
        milliseconds < 10
            ? `00${milliseconds}`
            : milliseconds < 100
              ? `0${milliseconds}`
              : milliseconds < 1000
                ? `${milliseconds}`
                : milliseconds
    }`;
};

export default function StopWatch() {
    /**
     * Setting the generic types of your useState function is only useful if it is not possible to easily infer it from the default value.
     * So for time and isRunning, you don't need to set the generic. But for lapTimes, you do, because it's not clear what type array it is.
     */
    // Time in milliseconds
    const [time, setTime] = useState(0);
    // Current status of timer
    const [isRunning, setIsRunning] = useState(false);
    // List of lap times in milliseconds
    const [lapTimes, setLapTimes] = useState<number[]>([]);

    // Runs every time the time or running status changes. Increases milliseconds by 1.
    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setTime(time + 1);
        }, 1);
        return () => clearInterval(interval);
    }, [time, isRunning]);

    return (
        <div className="flex flex-col justify-center gap-5">
            <div className="flex flex-col gap-5">
                <p className="font-mono text-5xl">{formatTime(time)}</p>
                <div className="flex justify-center gap-4">
                    <StopWatchButton onClick={() => setIsRunning(!isRunning)}>
                        {isRunning ? "Stop" : "Start"}
                    </StopWatchButton>
                    <StopWatchButton
                        onClick={() => setLapTimes([...lapTimes, time])}
                        disabled={!isRunning}
                    >
                        Lap
                    </StopWatchButton>
                    <StopWatchButton
                        onClick={() => {
                            setTime(0);
                            setLapTimes([]);
                        }}
                    >
                        Reset
                    </StopWatchButton>
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <h3 className="text-3xl">Lap List</h3>
                <ol data-testid="lap-list" className="list-decimal list-inside font-mono">
                    {lapTimes.map((lapTime, index) => (
                        <li key={index} data-testid={`lap-${index + 1}`}>
                            {formatTime(lapTime)}
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}
