import React, { useRef, useState } from 'react'
import StopWatchButton from './StopWatchButton'
import StopWatch from './StopWatch'

export default function App() {
    const intervalId = useRef(null); 

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const startTimer = () => {
        if (!isRunning) {
            setIsRunning(true);
            intervalId.current = setInterval(() => {
                setTime((time) => time + 10)
            }, 10);
        }
    }

    const stopTimer = () => {
        if (isRunning) {
            setIsRunning(false);
            clearInterval(intervalId.current);
        }
    }

    const resetTimer = () => {
        stopTimer();
        setTime(0);
    }

    return(
        <div>
            <div>
                <StopWatch time={time} />
            </div>
            <div>
                <StopWatchButton onClick={startTimer}>Start</StopWatchButton>
                <StopWatchButton onClick={stopTimer}>Stop</StopWatchButton>
                <StopWatchButton onClick={resetTimer}>Reset</StopWatchButton>
            </div>
        </div>
    )
}