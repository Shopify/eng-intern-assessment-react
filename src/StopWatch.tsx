import React, { useEffect, useState } from "react";
import StopWatchButton from "./StopWatchButton";

const formatTime = (time: number) => {
    const hours = Math.floor(time / 1000 / 60 / 60);
    const minutes = Math.floor(time / 1000 / 60) % 60;
    const seconds = Math.floor(time / 1000) % 60;
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
        <div>
            <p>{formatTime(time)}</p>
            {
                /**
                 * I personally wouldn't have implemented the stopwatch buttons this way. I would've either made the other component
                 * in this same file, or just put the buttons right here. This keeps the state in one place, and makes it easier to
                 * understand what's going on, and work on it later. In my opinion, prop-drilling this way is bad-practice in React.
                 * If this stopwatch continued to be built upon, adding features to it would be difficult with the state structured 
                 * this way. At best, I would've made a separate button UI component for styling purposes only, and localized the logic
                 * and state here.
                 * 
                 * I did it this way anyway because this is how the problem asked it to be structured. I tried to keep StopWatchButton 
                 * as simple and logic/state-less as possible.
                 */
            }
            <StopWatchButton
                setIsRunning={setIsRunning}
                isRunning={isRunning}
                reset={() => {
                    setTime(0);
                    setLapTimes([]);
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
