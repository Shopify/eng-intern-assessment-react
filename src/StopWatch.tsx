/**
 * StopWatch component that implements a basic stopwatch with lap times using
 * React state to track elapsed time, whether the stopwatch is running, and
 * an array of lap objects.
 *
 * Unlike the FizzBuzz Enterprise Edition, this component aims for simplicity
 * and performance, without overengineering. Similar to how you don't need a
 * distributed, cloud-based service to figure out if a number is divisible by
 * 3 or 5, sometimes a stopwatch just needs to count time.
 *
 * @author Victoria Mazilu
 * Date Last Modified 23 January, 2024
 */

import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";

interface Lap {
    label: string;
    time: string;
}

export default function StopWatch() {
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [prevTime, setPrevTime] = useState<number>(0);
    const [laps, setLaps] = useState<Lap[]>([]);

    useEffect(() => {
        if (isRunning) {
            const id = setInterval(() => {
                // Increment the elapsed time and update laps with the new time by taking the difference.
                const newElapsedTime = elapsedTime + 45;
                setElapsedTime(newElapsedTime);

                setLaps((laps) => {
                    const newLaps = [...laps];
                    if (newLaps.length > 0) {
                        newLaps[newLaps.length - 1].time = formatTime(
                            newElapsedTime - prevTime
                        );
                    }
                    return newLaps;
                });
            }, 45); // Interval updates every 45 milliseconds.

            setIntervalId(id);
        } else if (intervalId) {
            clearInterval(intervalId);
        }

        // Cleanup function to clear the interval when the component stops.
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isRunning, elapsedTime, laps]);

    const toggleStartStop = () => {
        setIsRunning(!isRunning);
        if (!isRunning) {
            if (laps.length === 0) {
                // If no laps have been recorded, start the first lap
                setLaps([{ label: "Lap 1", time: formatTime(0) }]);
                setPrevTime(0);
            }
        } else {
            if (intervalId) {
                clearInterval(intervalId);
                setIntervalId(null);
            }
        }
    };

    // I know this isn't complex enough to be enterprise edition. However, I promise to add 15 dependencies to the next project.
    const toggleResetAndLap = () => {
        if (isRunning) {
            // Append new lap object
            setLaps((prevLaps) => [
                ...prevLaps,
                { label: `Lap ${prevLaps.length + 1}`, time: formatTime(0) },
            ]);
            setPrevTime(elapsedTime);
        } else {
            // Reset
            if (intervalId) {
                clearInterval(intervalId);
                setIntervalId(null);
            }
            setLaps([]);
            setIsRunning(false);
            setElapsedTime(0);
            setPrevTime(0);
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

    // Splitting the formatted time.
    const [formattedMinutes, formattedSeconds, formattedMilliseconds] =
        formatTime(elapsedTime).split(" ");

    return (
        <section>
            <div className="flex-col flex custom-margin">
                <div
                    className="stopwatch-container font-gradient"
                    data-testid="time-display"
                >
                    {" "}
                    <div className="time-box">{formattedMinutes}</div>:{" "}
                    <div className="time-box">{formattedSeconds}</div>.
                    <div className="time-box">{formattedMilliseconds}</div>
                </div>

                <div className="stopwatch-container">
                    <StopWatchButton
                        label={isRunning ? "Lap" : "Reset"}
                        onClick={toggleResetAndLap}
                        isRunning={isRunning}
                        className="button-outline font-gradient-small"
                    />
                    <StopWatchButton
                        label={isRunning ? "Stop" : "Start"}
                        onClick={toggleStartStop}
                        isRunning={isRunning}
                        className="button-outline font-gradient-small"
                    />
                </div>
                <hr className="custom-hr" />
                <div className="scrollable">
                    {/* Split and map through the laps to display each in the array with the label and time */}
                    {laps
                        .slice()
                        .reverse()
                        .map((lap, index) => (
                            <div key={index} className="">
                                <div
                                    className="lap"
                                    data-testid="lap-container"
                                >
                                    <div className="lap-label">
                                        {lap.label}:{" "}
                                    </div>
                                    <div className="lap">
                                        <span className="lap-time">
                                            {lap.time.slice(0, 2)}
                                        </span>
                                        :
                                        <span className="lap-time">
                                            {lap.time.slice(3, 5)}
                                        </span>
                                        .
                                        <span className="lap-time">
                                            {lap.time.slice(6, 8)}
                                        </span>
                                    </div>
                                </div>
                                <hr className="custom-hr" />
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
}
