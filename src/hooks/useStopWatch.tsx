import { useState, useEffect } from 'react';

export const useStopWatch = () => {
    const [time, setTime] = useState<number>(0);
    const [running, setRunning] = useState<boolean>(false);
    const [laps, setLaps] = useState<number[]>([]);
    const [lastLapTime, setLastLapTime] = useState<number>(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [running]);

    const start = (): void => {
        setRunning(true);
        setLastLapTime(0);
    };

    const stop = (): void => {
        setRunning(false);
    };

    const reset = (): void => {
        setTime(0);
        setLaps([]);
        setLastLapTime(0);
    };

    const lap = (): void => {
        const currentLapTime = time - lastLapTime;
        setLaps((prevLaps) => [...prevLaps, currentLapTime]);
        setLastLapTime(time);
    };

    return { time, running, laps, start, stop, reset, lap };
};

export default useStopWatch;