import React, {useEffect, useState} from 'react'
import styles from './StopWatch.module.css'
import StopWatchButton from "../StopWatchButton/StopWatchButton";

export default function StopWatch() {
    const [time, setTime] = useState<number>(0);
    const [running, setRunning] = useState<boolean>(false);

    useEffect( () => {
        let interval: NodeJS.Timeout | null = null;

        if(running){
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if(!running && time !== 0){
            clearInterval(interval!)
        }

        return () => clearInterval(interval!)
    }, [running, time]);

    const toggleStartStop = () => setRunning(!running);
    const resetStopwatch = () => {
        setRunning(false);
        setTime(0);
    }

    return(
        <div className={styles.stopwatch}>
            <div className={styles.timeDisplay}>
                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
            </div>
            <StopWatchButton
                isRunning={running}
                onStartStop={toggleStartStop}
                onReset={resetStopwatch}
            />
        </div>
    )
}