import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";

interface Lap {
    label: string;
    time: string;
}

export default function StopWatch() {
    // Explicitly set the type of the state
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [laps, setLaps] = useState<Lap[]>([]); // Array of laps

    useEffect(() => {
        if (isRunning) {
            const id = setInterval(() => {
                setElapsedTime((prevElapsedTime) => prevElapsedTime + 20);
            }, 20); // Interval set to 20 milliseconds
            setIntervalId(id);
        } else if (intervalId) {
            clearInterval(intervalId);
        }

        // Clean up the interval on unmount
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isRunning]);

    // To toggle the timer on or off
    const toggleStartStop = () => {
        setIsRunning(!isRunning);
        if (isRunning && intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };

    //Depending on the state of the timer, either record a new lap or reset the timer
    const toggleResetLap = () => {
        if (isRunning) {
            //Record a new lap
            const newLap: Lap = {
                label: `Lap ${laps.length + 1}`,
                time: formatTime(elapsedTime),
            };
            setLaps([newLap, ...laps]);
        } else {
            if (intervalId) {
                clearInterval(intervalId);
                setIntervalId(null);
            }
            setLaps([]);
            setIsRunning(false);
            setElapsedTime(0);
        }
    };

    const formatTime = (totalMilliseconds: number): string => {
        const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
        const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
        const milliseconds = Math.floor((totalMilliseconds % 1000) / 10);

        const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        const formattedMilliseconds =
            milliseconds < 10 ? `0${milliseconds}` : `${milliseconds}`;

        return `${formattedMinutes} ${formattedSeconds} ${formattedMilliseconds}`;
    };

    const [formattedMinutes, formattedSeconds, formattedMilliseconds] =
        formatTime(elapsedTime).split(" ");

    return (
        <section>
            <div className="flex-col flex custom-margin bg-blue-500">
                <div className="stopwatch-container">
                    <div className="time-box">{formattedMinutes}</div>
                    <div className="box">:</div>
                    <div className="time-box">{formattedSeconds}</div>
                    <div className="box">.</div>
                    <div className="time-box">{formattedMilliseconds}</div>
                </div>
                <div className="stopwatch-container">
                    <StopWatchButton
                        label={isRunning ? "Lap" : "Reset"}
                        onClick={toggleResetLap}
                        isRunning={isRunning}
                        className="button-outline"
                    />

                    <StopWatchButton
                        label={isRunning ? "Stop" : "Start"}
                        onClick={toggleStartStop}
                        isRunning={isRunning}
                        className="button-outline"
                    />
                </div>
                <hr className="custom-hr" />
                <div className="scrollable">
                    {/* Laps Display */}
                    {laps.map((lap, index) => (
                        <div key={index} className="lap py-2">
                            <span>{lap.label}</span>: <span>{lap.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
