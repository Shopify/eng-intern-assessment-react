import {useEffect, useState} from "react";

export function useStopWatch(){
    const [time, setTime] = useState<number>(0);
    const [running, setRunning] = useState<boolean>(false);
    const [laps, setLaps] = useState<number[]>([]);
    const [lastLapTime, setLastLapTime] = useState<number>(0);
    const [referenceTime, setReferenceTime] = useState<number>(Date.now());

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if(running){
            const updateStopwatch = () => {
                setTime(prevTime => {
                    const now = Date.now();
                    const interval = now - referenceTime; // This takes into account drift in callback execution
                    setReferenceTime(now)
                    return prevTime + interval;
                })
            }

            timeoutId = setTimeout(updateStopwatch, 10)
        }

        return () => {
            clearTimeout(timeoutId); // Clear the timeout when the stopwatch stops or the component unmounts
        };
    }, [running, referenceTime]);

    const toggleStartStop = () => {
        setRunning(!running)
        if (!running) {
            setReferenceTime(Date.now());
        }
    };
    const handleLapReset = () => {
        if (running) {
            const lapTime = time - lastLapTime;
            setLaps([...laps, lapTime]) //  Create a new array with existing lap times + new time. Update laps.
            setLastLapTime(time);
        } else {
            setRunning(false);
            setTime(0);
            setLaps([]);
            setLastLapTime(0);
        }
    }

    return { time, running, laps, toggleStartStop, handleLapReset};
}