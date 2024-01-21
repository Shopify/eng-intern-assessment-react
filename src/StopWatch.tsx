import React, { useEffect, useState } from 'react'

import './StopWatch.css'
import StopWatchButton from './StopWatchButton'
import Laps from './Laps';

// Format time into minutes, seconds and milliseconds
export const calculateTime = (time: number) => {
    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const milliseconds = time % 100;

    return [minutes.toString().padStart(2, "0"), seconds.toString().padStart(2, "0"), milliseconds.toString().padStart(2, "0")]
}

export const StopWatch = () => {
    const [time, setTime] = useState<number>(0);
    const [timerData, setTimerData] = useState<string[]>([]);
    const [laps, setLaps] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    useEffect(() => {
        // Update current time information
        const timerInfo = calculateTime(time)
        setTimerData(timerInfo)

        // Update time count by every 10 ms
        let timeInterval: NodeJS.Timeout;
        if (isRunning) {
            timeInterval = setInterval(() => setTime(time + 1), 10)
        }
        return () => clearInterval(timeInterval)
    }, [time, isRunning])

    const handleStartStopTime = () => {
        setIsRunning(!isRunning)
    }

    // Reset the stopwatch states - running, time and laps
    const handleReset = () => {
        setIsRunning(false)
        setTime(0)
        setLaps([])
    }

    // Add lap if time is not paused
    const handleLap = () => {
        if (!isRunning) return
        const lap = `${timerData[0]}:${timerData[1]}:${timerData[2]}`
        setLaps((prev) => [...prev, lap])
    }

    return (
        <div className='stopwatch-container'>
            {/* Timer Display */}
            <div className='timer'>
                <p className='timer-text'>{timerData[0]}</p>
                <span role="colon" className='timer-colon'>:</span>
                <p className='timer-text'>{timerData[1]}</p>
                <span role="colon" className='timer-colon'>:</span>
                <p className='timer-text'>{timerData[2]}</p>
            </div>
            {/* StopWatch Buttons display */}
            <div className='buttons-container'>
                <StopWatchButton name={!isRunning ? 'Start' : 'Stop'} handleClick={handleStartStopTime} />
                <StopWatchButton name='Reset' handleClick={handleReset} />
                <StopWatchButton name='Lap' handleClick={handleLap} />
            </div>
            {/* Laps Display */}
            <Laps laps={laps} />
        </div>
    )
}