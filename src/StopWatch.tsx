import React, { useEffect, useState } from 'react'

import './StopWatch.css'
import StopWatchButton from './StopWatchButton'
import Laps from './Laps';

export const calculateTime = (time: number) => {
    // Minutes calculation
    const minutes = Math.floor((time % 360000) / 6000);

    // Seconds calculation
    const seconds = Math.floor((time % 6000) / 100);

    // Milliseconds calculation
    const milliseconds = time % 100;

    return [minutes.toString().padStart(2, "0"), seconds.toString().padStart(2, "0"), milliseconds.toString().padStart(2, "0")]
}

export default function StopWatch() {
    const [time, setTime] = useState<number>(0);
    const [timerData, setTimerData] = useState<string[]>([]);
    const [laps, setLaps] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    useEffect(() => {
        const timerInfo = calculateTime(time)
        setTimerData(timerInfo)

        let timeInterval: NodeJS.Timeout;
        if (isRunning) {
            timeInterval = setInterval(() => setTime(time + 1), 10)
        }

        return () => clearInterval(timeInterval)
    }, [time, isRunning])

    const handleStartStopTime = () => {
        setIsRunning(!isRunning)
    }

    const handleReset = () => {
        setIsRunning(false)
        setTime(0)
        setLaps([])
    }

    const handleLap = () => {
        if (time === 0) return
        const lap = timerData[0] + ':' + timerData[1] + ':' + timerData[2]
        setLaps((prev) => [...prev, lap])
    }

    return (
        <div className='stopwatch-container'>
            <div className='timer'>
                <p className='timer-text'>{timerData[0]}</p>
                <p className='timer-colon'>:</p>
                <p className='timer-text'>{timerData[1]}</p>
                <p className='timer-colon'>:</p>
                <p className='timer-text'>{timerData[2]}</p>
            </div>
            <div className='buttons-container'>
                <StopWatchButton name={!isRunning ? 'Start' : 'Stop'} handleClick={handleStartStopTime} />
                <StopWatchButton name='Reset' handleClick={handleReset} />
                <StopWatchButton name='Lap' handleClick={handleLap} />
            </div>
            <Laps laps={laps} />
        </div>
    )
}