import { useState, useEffect } from 'react';

interface StopwatchState {
    time: number;
    lapTime: number;
    isRunning: boolean;
    laps: number[];
}

const useStopwatch = (): StopwatchState & {
    start: () => void;
    stop: () => void;
    lap: () => void;
    reset: () => void;
    milliseconds: number;

} => {
    const [time, setTime] = useState<number>(0);
    const [lapTime, setLapTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [laps, setLaps] = useState<number[]>([]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isRunning) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
                setLapTime(prevLapTime => prevLapTime + 1);
            }, 10);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning]);

    const start = () => setIsRunning(true);
    const stop = () => {
        setIsRunning(false);
    };
    const lap = () => {
        setLaps(prevLaps => [...prevLaps, lapTime]);
        setLapTime(0);
    }

    const reset = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    }

    const milliseconds = time % 1000
    return { time, lapTime, isRunning, laps, milliseconds, start, stop, lap, reset};
};

export default useStopwatch;
