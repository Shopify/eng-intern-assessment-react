import { useState, useEffect } from "react";
import { getCurrentTime } from "../utils/TimeUtils";
import { formatTime } from "../utils/FormatTime";

export const useStopWatch = () => {

    // Time is in seconds
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [lapTimes, steLapTimes] = useState<number[]>([]);
    
    // A newSession is defined as the time between 'starting' the
    // stop watch and 'reseting' the stop watch.
    // 'Stopping', 'Lapping', the stopwatch has no effect on the session
    const [newSession, setNewSession] = useState<boolean>(false);

    // Start time is the time in which the stop watch session has started
    const [startTime, setStartTime] = useState<number>(getCurrentTime());

    // Accumulatedtime accounts for the time the timer spent pausing
    const [accumulatedTime, setAccumulatedTime] = useState<number>(0);

    const handleStartStop = () => {
        if (!newSession) {
            setStartTime(getCurrentTime());
            setAccumulatedTime(0);
            setNewSession(true);
        }
        // paused
        if (isRunning) {
            setAccumulatedTime((prevAccumulatedTime) => prevAccumulatedTime + (getCurrentTime() - startTime));
        } else {
            // resumed
            setStartTime(getCurrentTime());
        }
        setIsRunning(!isRunning);
    }

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        setAccumulatedTime(0);
        setStartTime(getCurrentTime());
        setNewSession(false);
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
                let change = getCurrentTime() - startTime;
                setTime(change + accumulatedTime);
            }, 10)
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    return { time, isRunning, lapTimes, handleStartStop, handleReset, handleLap }
}
