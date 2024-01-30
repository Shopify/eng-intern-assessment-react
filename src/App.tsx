import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import StopWatchButton, {KeystrokeButton} from "./StopWatchButton";
import StopWatch from "./StopWatch";
import {Laps} from "./Laps";
import { IoIosCloseCircle } from "react-icons/io";
import {ILap} from './StopwatchType'
const TEN_MS = 10;
export default function App() {
    const startTimeRef = useRef(0);
    const [time, setTime] = useState<number>(0);
    const [laps, setLaps] = useState<ILap[]>([]);
    const lapsEmpty = laps.length === 0;
    const addLaps = useCallback((newTime:number) => {
        const lastLapTime = laps.length > 0 ? laps[laps.length - 1].lapTime : 0;
        const newLap = {
            lapTime:newTime,
            splitTime: newTime - lastLapTime
        }
        setLaps([...laps, newLap])
    }, [laps]);

    let intervalRef = useRef<NodeJS.Timer>(null);
    const [timerState, setTimerState] = useState<boolean>(false);

    useEffect(() => {
        if (timerState) {
            startTimeRef.current = Date.now() - time;
            intervalRef.current = setInterval(() => {
                setTime(Date.now() - startTimeRef.current);
            }, TEN_MS);
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
        <div className={`p-6 h-screen flex flex-col items-center align-middle`}>
            <div className={`p-4 md:w-[400px] bg-light-grey shadow-md rounded-md flex flex-col justify-start items-center flex-grow gap-2`}>
                <StopWatch time={time}/>
                <StopWatchButton useTimer={timerState}
                                 useTimerHandler={handleTimerState}
                                 resetHandler={handleReset}
                                 lapHandler={handleLap}
                                 lapsEmpty={lapsEmpty}
                />
                <Laps laps={laps}/>

            </div>
            <ShorcutsExplain/>
        </div>
    )
}


export function ShorcutsExplain(){
    const [hideExplanation,setHideExplanation] = useState(false);
    return(
    <div className={`${hideExplanation ? `hidden` : `md:block`} bg-light-grey sm:hidden absolute w-30 h-30 p-4 bottom-4 left-4 shadow-md rounded-md bg-gray-200`}>
        <div className={`flex flex-row-reverse w-full`}>
            <button onClick={()=> {
                setHideExplanation(true);
            }}><IoIosCloseCircle/></button>
        </div>
        <ul>
            <li className={`flex flex-row justify-between gap-2`}>{<KeystrokeButton keyCode={"Spacebar"}/>}Start/Pause Timer</li>
            <li className={`flex flex-row justify-between`}>{<KeystrokeButton keyCode={"L"}/>} Add Laps</li>
            <li className={`flex flex-row justify-between`}>{<KeystrokeButton keyCode={"R"}/>} Reset</li>
        </ul>
    </div>
    )
}