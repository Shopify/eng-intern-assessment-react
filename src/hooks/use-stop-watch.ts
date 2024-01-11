import { useRef, useState } from "react";

/**
 * Custom hook to provide stopwatch functionality.
 *
 * The hook returns the current time and running status of the
 * stopwatch timer, and it provides actions to start, stop (pause),
 * and reset the stopwatch timer to zero.
 */
export const useStopWatch = () => {
    const intervalId = useRef(null);

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const start = () => {
        if (!isRunning) {
            setIsRunning(true);
            intervalId.current = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        }
    };

    const stop = () => {
        if (isRunning) {
            setIsRunning(false);
            clearInterval(intervalId.current);
        }
    };

    const reset = () => {
        stop();
        setTime(0);
    };

    return {
        time,
        isRunning,
        start,
        stop,
        reset,
    };
};
