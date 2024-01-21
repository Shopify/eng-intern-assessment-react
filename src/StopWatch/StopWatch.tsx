import React, {useCallback, useEffect, useState} from 'react'
import StopWatchButton from "./StopWatchButton";
import { faCirclePlay, faCirclePlus, faCirclePause, faTrash } from '@fortawesome/free-solid-svg-icons'
import {formatTime} from "../utils";
import './StopWatch.scss'
export default function StopWatch() {
    const [isActive, setIsActive] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);

    const start = useCallback(() => {
        setIsActive(true);
        setStartTime(Date.now() - elapsedTime);
    }, [elapsedTime]);

    const reset = useCallback(() => {
        setIsActive(false);
        setStartTime(0)
        setElapsedTime(0);
    },[]);

    useEffect(() => {
        let interval: number | null = null;
        if (isActive) {
            interval = window.setInterval(() => {
                setElapsedTime(Date.now() - startTime);
            }, 10);
        }
        return () => !!interval && window.clearInterval(interval);
    }, [isActive, startTime]);

    return(
        <div className="stopwatch-container">
            <div className="stopwatch" data-testid="stopwatch">{formatTime(elapsedTime)}</div>
            {isActive ? (
                <div className="buttons-container">
                    <StopWatchButton testId="faCirclePause" icon={faCirclePause} onClick={() => {setIsActive(false)}} />
                </div>
            ) : (
                <div className="buttons-container">
                    <StopWatchButton data-testid="faCirclePlay" testId="faCirclePlay" icon={faCirclePlay} onClick={start}/>
                    {elapsedTime > 0 && <StopWatchButton testId="faTrash" icon={faTrash} onClick={reset}/>}
                </div>
            )}
        </div>
    )
}