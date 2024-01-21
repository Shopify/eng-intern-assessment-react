import React, {useCallback, useEffect, useState} from 'react'
import StopWatchButton from "./StopWatchButton";
import { faCirclePlay, faCirclePlus, faCirclePause, faTrash } from '@fortawesome/free-solid-svg-icons'
import {formatTime} from "../utils";
import './StopWatch.scss'
import {Lap} from "../Laps/types";

type Props = {
    setLaps: React.Dispatch<React.SetStateAction<Array<Lap>>>;
}
export default function StopWatch({setLaps}:Props) {
    const [isActive, setIsActive] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [lastLapTime, setLastLapTime] = useState(0);

    const start = useCallback(() => {
        setIsActive(true);
        setStartTime(Date.now() - elapsedTime);
    }, [elapsedTime]);

    const reset = useCallback(() => {
        setIsActive(false);
        setStartTime(0)
        setElapsedTime(0);
        setLastLapTime(0);
        setLaps([])
    },[setLaps]);

    useEffect(() => {
        let interval: number | null = null;
        if (isActive) {
            interval = window.setInterval(() => {
                setElapsedTime(Date.now() - startTime);
            }, 10);
        }
        return () => !!interval && window.clearInterval(interval);
    }, [isActive, startTime]);

    const createLap = useCallback(() => {
        const newLapTime = elapsedTime - lastLapTime;
        setLaps((prevState) => [
            ...prevState,
            { lapNumber: prevState.length, lapTime: newLapTime }
        ])
        setLastLapTime(elapsedTime);
    },[elapsedTime, lastLapTime, setLaps])

    return(
        <div className="stopwatch-container">
            <div className="stopwatch" data-testid="stopwatch">{formatTime(elapsedTime)}</div>
            {isActive ? (
                <div className="buttons-container">
                    <StopWatchButton testId="pause" icon={faCirclePause} onClick={() => {setIsActive(false)}} />
                    <StopWatchButton testId="create-lap" icon={faCirclePlus} onClick={createLap} />
                </div>
            ) : (
                <div className="buttons-container">
                    <StopWatchButton data-testid="play" testId="play" icon={faCirclePlay} onClick={start}/>
                    {elapsedTime > 0 && <StopWatchButton testId="reset" icon={faTrash} onClick={reset}/>}
                </div>
            )}
        </div>
    )
}