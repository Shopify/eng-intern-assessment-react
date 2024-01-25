import { useState, useEffect } from 'react';

export const useStopwatch = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const [lastLapTime, setLastLapTime] = useState(0);

    useEffect(() => {
        if (running) {
            const interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [running]);

    const start = () => {
        setRunning(true);
        setLastLapTime(0);
    };

    const stop = () => setRunning(false);

    const reset = () => {
        setTime(0);
        setLaps([]);
        setLastLapTime(0);
    };

    const lap = () => {
        const currentLapTime = time - lastLapTime;
        setLaps([...laps, currentLapTime]);
        setLastLapTime(time);
    };

    return { time, running, laps, start, stop, reset, lap };
};

export default useStopwatch;