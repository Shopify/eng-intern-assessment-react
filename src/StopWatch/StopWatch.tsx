import React, {useEffect, useState} from 'react'
import styles from './StopWatch.module.css'
import StopWatchButton from "../StopWatchButton/StopWatchButton";
import exp from "constants";

export default function StopWatch() {
    const [time, setTime] = useState<number>(0);
    const [running, setRunning] = useState<boolean>(false);
    const [laps, setLaps] = useState<number[]>([]);
    const [lastLapTime, setLastLapTime] = useState<number>(0);
    const [referenceTime, setReferenceTime] = useState<number>(Date.now());

    const shortestLapTime = laps.length > 0 ? Math.min(...laps) : 0;
    const longestLapTime = laps.length > 0 ? Math.max(...laps) : 0;

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if(running){
            const updateStopwatch = () => {
                setTime(prevTime => {
                    const now = Date.now();
                    const interval = now - referenceTime;
                    setReferenceTime(now)
                    return prevTime + interval;
                })
            }

            timeoutId = setTimeout(updateStopwatch, 10)
        }

        return () => {
            clearTimeout(timeoutId); // Clear the timeout when the stopwatch stops or the component unmounts
        };
    }, [running, time]);

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

    return (
        <div className={styles.stopwatch}>
            <div className={styles.timeDisplay}>
                {formatTime(time)}
            </div>
            <StopWatchButton
                isRunning={running}
                onStartStop={toggleStartStop}
                onLapReset={handleLapReset}
            />
            <div className={styles.laps}>
                {laps.map((lap, index) => (
                    <div key={index} className={
                        lap === shortestLapTime ? styles.shortestLap :
                            lap === longestLapTime && shortestLapTime !== longestLapTime ? styles.longestLap :
                                ''
                    }>Lap {index + 1}: {formatTime(lap)}</div>
                ))}
            </div>
        </div>

    )
}

function formatTime(time: number) {
    return `${("0" + Math.floor(time / 3600000)).slice(-2)}:${("0" + Math.floor((time % 3600000) / 60000)).slice(-2)}:${("0" + Math.floor((time % 60000) / 1000)).slice(-2)}:${("0" + Math.floor((time % 1000) / 10)).slice(-2)}`;
}
