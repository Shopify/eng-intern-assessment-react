import React, {useEffect, useState} from 'react'
import styles from './StopWatch.module.css'
import StopWatchButton from "../StopWatchButton/StopWatchButton";

export default function StopWatch() {
    const [time, setTime] = useState<number>(0);
    const [running, setRunning] = useState<boolean>(false);
    const [laps, setLaps] = useState<number[]>([]);
    const [lastLapTime, setLastLapTime] = useState<number>(0);


    useEffect( () => {
        let interval: NodeJS.Timeout | null = null;

        if(running){
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else {
            clearInterval(interval!)
        }

        return () => clearInterval(interval!)
    }, [running]);

    const toggleStartStop = () => {
        setRunning(!running)
    };
    const handleLapReset = () => {
        if(running){
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
                onLapReset={handleLapReset}
            />
            <div className={styles.laps}>
                {laps.map((lap, index) =>(
                    <div key={index}>Lap {index+1}: {formatTime(lap)}</div>
                ))}
            </div>
        </div>
    )
}

function formatTime(time:number){
    return `${("0" + Math.floor((time / 60000) % 60)).slice(-2)}:${("0" + Math.floor((time / 1000) % 60)).slice(-2)}:${("0" + ((time / 10) % 100)).slice(-2)}`;
}