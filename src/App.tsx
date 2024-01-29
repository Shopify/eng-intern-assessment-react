import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import StopWatchButton from "./StopWatchButton";
import StopWatch from "./StopWatch";
import {Laps} from "./Laps";

const ONE_SECOND = 10;
const MILLISECOND = 1;
export default function App() {
    const startTimeRef = useRef(0);
    const [time, setTime] = useState<number>(0);
    const [laps, setLaps] = useState<number[]>([]);
    const lapsEmpty = laps.length === 0;
    const addLaps = useCallback((newTime) => setLaps([...laps, newTime]), [laps]);

    let intervalRef = useRef<NodeJS.Timer>(null);
    const [timerState, setTimerState] = useState<boolean>(false);

    useEffect(() => {
        if (timerState) {
            startTimeRef.current = Date.now() - time;
            intervalRef.current = setInterval(() => {
                setTime(Date.now() - startTimeRef.current);
            }, ONE_SECOND);
        } else {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        return () => clearInterval(intervalRef.current);
    }, [timerState]);


    const handleTimerState = (newState: boolean) => {
        setTimerState(newState);
    }
    const handleReset = () => {
        handleTimerState(false);
        setTime(0);
        setLaps([]);
    }

    const handleLap = () => {
        addLaps(time);
    }

    return (
        <div className={`p-2 h-screen flex flex-col  items-center align-middle `}>
            <div className={`mt-52 flex flex-col justify-start items-center flex-grow gap-2`}>
                <StopWatch time={time}/>
                <StopWatchButton useTimer={timerState}
                                 useTimerHandler={handleTimerState}
                                 resetHandler={handleReset}
                                 lapHandler={handleLap}
                                 lapsEmpty={lapsEmpty}
                />
                <Laps laps={laps}/>
            </div>
        </div>
    )
}