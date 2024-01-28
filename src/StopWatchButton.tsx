import React from "react";
import { formatTime } from "./helperFunctions";

// Define props interface for component
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
        <>
            {/* Conditionally render buttons based on status of stopwatch and time value */}
            {!isRunning && !time && (
                <button className="start" onClick={() => setIsRunning(true)}>Start</button>
            )}
            {!isRunning && time > 0 && (
                <button className="resume" onClick={() => setIsRunning(true)}>Resume</button>
            )}
            {isRunning && (
                <button className="lap" onClick={() => setLaps([...laps, time])}>Lap</button>
            )}
            {isRunning && (
                <button className="stop" onClick={() => setIsRunning(false)}>Stop</button>
            )}
            {!isRunning && time > 0 && (
                <button className="reset" onClick={() => setTime(0)}>Reset</button>
            )}

            {/* Conditionally render laps values based on laps array props */}
            {laps.length > 0 && (
                <ul>
                    {laps.map((lap, index) => (
                        <li key={index}>
                            Lap {index + 1}: {formatTime(lap)}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default StopWatchButton;
