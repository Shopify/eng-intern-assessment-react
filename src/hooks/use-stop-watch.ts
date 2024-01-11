import { useRef, useState } from "react";

/**
 * Custom hook to provide stopwatch functionality.
 */
export const useStopWatch = () => {
    const intervalId = useRef(null);

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isStopped, setIsStopped] = useState(true);
    const [isReset, setIsReset] = useState(true);
    const [laps, setLaps] = useState([] as number[]);

    const toggleStartPause = () => {
        setIsStopped(false);
        setIsReset(false);

        if (!isRunning) {
            setIsRunning(true);
            intervalId.current = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        } else {
            setIsRunning(false);
            clearInterval(intervalId.current);
        }
    };

    const stop = () => {
        setIsStopped(true);
        
        if (isRunning) {
            setIsRunning(false);
            clearInterval(intervalId.current);
        }
    };

    const reset = () => {
        stop();
        setIsReset(true);
        setTime(0);
        setLaps([]);
    };

    const recordLap = () => { 
        setLaps([time, ...laps]);
        console.log(laps)
    };

    return {
        time,
        isRunning,
        isStopped,
        isReset,
        laps,
        toggleStartPause,
        stop,
        reset,
        recordLap,
    };
};
