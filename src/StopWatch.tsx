import React, { useEffect, useState } from 'react'
import StopWatchButtons from './StopWatchButtons';
import LapsContainer from './LapsContainer';

export default function StopWatch() {

    const [time, setTime] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [laps, setLaps] = useState<string[]>([])

    useEffect(() => {
        let intervalId: NodeJS.Timer;
        if (isRunning) {
          intervalId = setInterval(() => setTime(time + 1), 10);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, time]);

    const checkZero = (str: string) => {
        if (str.length < 2) {
            return '0' + str
        }
        return str
    }

    const formatTime = (time: number) => {
        // Hours
        const hours = checkZero(Math.floor(time / 360000).toString());

        // Minutes 
        const minutes = checkZero(Math.floor((time % 360000) / 6000).toString());

        // Seconds
        const seconds = checkZero(Math.floor((time % 6000) / 100).toString());

        // Milliseconds
        const milliseconds = checkZero((time % 100).toString());

        return `${hours}:${minutes}:${seconds}:${milliseconds}`
    }

    const handleTimerChangeRunning = () => {
        setIsRunning(!isRunning)
    }

    const handleTimerReset = () => {
        setIsRunning(false)
        setLaps([])
        setTime(0)
    }

    const handleLapAdd = () => {
        const formattedTime = formatTime(time)
        setLaps([...laps, formattedTime])
    }

    return(
        <div>

            <div>{formatTime(time)}</div>
            <StopWatchButtons isRunning={isRunning} handleTimerReset={handleTimerReset} handleTimerRunning={handleTimerChangeRunning} handleLapAdd={handleLapAdd}/>
            <LapsContainer laps={laps}/>
        </div>
    )
}