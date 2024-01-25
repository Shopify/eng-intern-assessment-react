import { useState, useEffect } from "react";

export const useStopWatch = () => {

    // Time is in seconds
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [lapTimes, steLapTimes] = useState<number[]>([]);

    const handleStartStop = () => {
        setIsRunning(!isRunning);
    }

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        steLapTimes([]);
    }

    const handleLap = () => {
        if (isRunning) {
            // Add a new lap time to the list, treating it as a stack
            const lapTime = time;
            steLapTimes((prevTimes) => [lapTime, ...prevTimes]);
        }
    }

    // Set up an interval that updates the time ever second whenever isRunning is changed (start/stopped)
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning) {
            interval = setInterval(() => {
                setTime((prev_time) => prev_time + 1)
            }, 1000)
        }

        return () => clearInterval(interval);
    }, [isRunning]);


    return { time, isRunning, lapTimes, handleStartStop, handleReset, handleLap}
}
