import React, { useRef, useState } from 'react'
import StopWatchButton from './StopWatchButton'
import StopWatch from './StopWatch'

const App = () => {
    const intervalId = useRef(null); 

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const handleStart = () => {
        if (!isRunning) {
            setIsRunning(true);
            intervalId.current = setInterval(() => {
                setTime((time) => time + 10)
            }, 10);
        }
    }

    const handleStop = () => {
        if (isRunning) {
            setIsRunning(false);
            clearInterval(intervalId.current);
        }
    }

    const handleReset = () => {
        handleStop();
        setTime(0);
    }

    return(
        <div>
            <div>
                <StopWatch time={time} />
            </div>
            <div>
                <StopWatchButton onClick={handleStart}>Start</StopWatchButton>
                <StopWatchButton onClick={handleStop}>Stop</StopWatchButton>
                <StopWatchButton onClick={handleReset}>Reset</StopWatchButton>
            </div>
        </div>
    )
}

export default App;