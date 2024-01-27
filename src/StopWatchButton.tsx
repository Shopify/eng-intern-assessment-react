import React from "react";
import { formatTime } from "./helperFunctions";

interface RunningProps {
    isRunning: boolean;
    setIsRunning: Function;
    time: number;
    setTime: Function;
    laps: Array<any>;
    setLaps: Function;
}

const StopWatchButton: React.FC<RunningProps> = ({
    isRunning,
    setIsRunning,
    time,
    setTime,
    laps,
    setLaps,
}) => {
    return (
        <section>
            {!isRunning && !time && (
                <button onClick={() => setIsRunning(true)}>Start</button>
            )}
            {!isRunning && time > 0 && (
                <button onClick={() => setIsRunning(true)}>Resume</button>
            )}
            {isRunning && (
                <button onClick={() => setLaps([...laps, time])}>Lap</button>
            )}
            {isRunning && (
                <button onClick={() => setIsRunning(false)}>Stop</button>
            )}
            {!isRunning && time > 0 && (
                <button onClick={() => setTime(0)}>Reset</button>
            )}
            {laps.length > 0 && (
                <ul className="laps">
                    {laps.map((lap, index) => (
                        <li key={index}>
                            Lap {index + 1}: {formatTime(lap)}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default StopWatchButton;
