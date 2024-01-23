import React, {useEffect, useState} from 'react'
import styles from './StopWatch.module.css'
import StopWatchButton from "../StopWatchButton/StopWatchButton";
import {useStopWatch} from "../hooks/useStopWatch";
import {formatTime} from "../utils/timeUtils";

export default function StopWatch() {
    const { time, running, laps, toggleStartStop, handleLapReset} = useStopWatch();

    const shortestLapTime = laps.length > 0 ? Math.min(...laps) : 0;
    const longestLapTime = laps.length > 0 ? Math.max(...laps) : 0;

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
