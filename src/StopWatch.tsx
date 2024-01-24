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
                const newElapsedTime = elapsedTime + 45;
                setElapsedTime(newElapsedTime);

                // Update the current active lap time
                setLaps((laps) => {
                    const newLaps = [...laps];
                    if (newLaps.length > 0) {
                        newLaps[newLaps.length - 1].time = formatTime(
                            newElapsedTime - prevTime
                        );
                    }
                    return newLaps;
                });
            }, 45);
            setIntervalId(id);
        } else if (intervalId) {
            clearInterval(intervalId);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isRunning, elapsedTime, laps]);

    // To toggle the timer on or off
    const toggleStartStop = () => {
        setIsRunning(!isRunning);
        if (!isRunning) {
            // Starting the stopwatch
            if (laps.length === 0) {
                // If no laps have been recorded, start the first lap
                setLaps([{ label: "Lap 1", time: formatTime(0) }]);
                setPrevTime(0);
            }
        } else {
            // Stopping the stopwatch
            if (intervalId) {
                clearInterval(intervalId);
                setIntervalId(null);
            }
        }
    };

    const toggleResetAndLap = () => {
        if (isRunning) {
            // Finalize the current lap and start a new one
            setLaps((prevLaps) => [
                ...prevLaps,
                { label: `Lap ${prevLaps.length + 1}`, time: formatTime(0) },
            ]);
            setPrevTime(elapsedTime);
        } else {
            // Reset logic
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

    const [formattedMinutes, formattedSeconds, formattedMilliseconds] =
        formatTime(elapsedTime).split(" ");

    return (
        <section>
            <div className="flex-col flex custom-margin bg-blue-500">
                <div className="stopwatch-container font-gradient">
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
                    {/* Laps Display */}
                    {laps
                        .slice()
                        .reverse()
                        .map((lap, index) => (
                            <div key={index} className="">
                                <div className="lap">
                                    <div>{lap.label}: </div>
                                    <div>
                                        <span>{lap.time}</span>
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
