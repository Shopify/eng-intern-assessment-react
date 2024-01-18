import React, { useEffect, useState } from 'react'

import './StopWatch.css'
import StopWatchButton from './StopWatchButton'

const calculateTime = (time: number) => {
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

    const startStopTime = () => {
        setIsRunning(!isRunning)
    }

    const resetTime = () => {
        setTime(0)
    }

    return (
        <div>
            <div className='timer'>
                <p className='timer-text'>{timerData[0]}</p>
                <p className='timer-colon'>:</p>
                <p className='timer-text'>{timerData[1]}</p>
                <p className='timer-colon'>:</p>
                <p className='timer-text'>{timerData[2]}</p>
            </div>
            <div className='buttons-container'>
                <StopWatchButton name={!isRunning ? 'Start' : 'Stop'} handleClick={startStopTime}/>
                <StopWatchButton name='Reset' handleClick={resetTime}/>
                <StopWatchButton name='Lap' handleClick={startStopTime}/>
            </div>
        </div>
    )
}