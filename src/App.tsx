import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import StopWatchButton from "./StopWatchButton";
import StopWatch from "./StopWatch";
import {Laps} from "./Laps";

const ONE_SECOND = 10;
const MILLISECOND = 1;
export default function App() {
    const [time, setTime] = useState<number>(0);
    const [laps, setLaps] = useState<number[]>([]);
    const startTimeRef = useRef(0);
    const addLaps = useCallback((newTime) => setLaps([...laps, newTime]), [laps]);

    let intervalRef = useRef<NodeJS.Timer>(null);
    const [timerState, setTimerState] = useState<boolean>(false);

    useEffect(() => {
        if (timerState) {
            startTimeRef.current = Date.now() - time;
            intervalRef.current = setInterval(() => {
                setTime(Date.now() - startTimeRef.current);
            }, ONE_SECOND);

            if (intervalRef.current) {
                console.info('intervalRef initialized');
            }
        } else {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            console.info('intervalRef cleared');
        }
        return () => clearInterval(intervalRef.current);
    }, [timerState]);




    const handleTimerState = (newState: boolean) => {
        setTimerState(newState);

        console.info(`Stopwatch state toggled to ${timerState}`);
    }
    const handleReset = () => {
        handleTimerState(false);
        setTime(0);
        setLaps([]);
        console.info(`Stopwatch state reset to ${timerState}. Timestamp is ${time}. Laps is ${laps}`);
    }

    const handleLap = () => {
        addLaps(time);
    }

    return (
<div>
    <div className={`h-screen p-2 flex flex-col items-center justify-center align-middle`}>
        <StopWatch time={time}/>
        <StopWatchButton useTimer={timerState}
                         useTimerHandler={handleTimerState}
                         resetHandler={handleReset}
                         lapHandler={handleLap}
        />
        <Laps laps={laps}/>
    </div>
</div>
    )
}