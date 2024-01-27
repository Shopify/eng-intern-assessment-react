import React, { useRef, useState } from 'react'
import { formatTime } from '../utils/formatTime';
import StopWatchButton from './StopWatchButton';
import Laps from './Laps';

export default function StopWatch() {

    const [time, setTime] = useState<number>(0);
    const [currentLap, setCurrentLap] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [laps, setLaps] = useState<number[]>([]);
    
    let intervalRef = useRef(null);

    const resetLaps = () => {
        setLaps([])
        setTime(0)
        setCurrentLap(0);
    }

    const incrementTime = () => {
        setTime((prev) => prev + 10);
        setCurrentLap((prev) => prev + 10);
    }

    const activate = () => {
        setIsRunning(true);
    }

    const unactivate = () => {
        setIsRunning(false);
    }


    const startTimer = () => {
        if (time === 0) {
            resetLaps()
        }

        if (!isRunning) {
            intervalRef.current = setInterval(() => { incrementTime() }, 10)
            activate()
        }
    }

    const stopTimer = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        unactivate()
    }

    const resetTimer = () => {
        stopTimer()
        resetLaps()
    }

    const newLap = () => {    
        setLaps([...laps, currentLap]);
        setCurrentLap(0)
    }

    return(
        <div>
            <h3>{formatTime(time)}</h3>
            <StopWatchButton 
                time={time}
                isRunning={isRunning}
                handleStartTimer={startTimer}
                handleStopTimer={stopTimer}
                handleResetTimer={resetTimer}
                handleNewLap={newLap}
            />
            <Laps laps={laps} currentLapTime={currentLap} />
        </div>
    )
} 