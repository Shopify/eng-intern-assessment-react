import './App.css';
import React, { useState, useRef } from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

function App() {
    const intervalRef = useRef<NodeJS.Timeout>(null);
    const [timeElapsed, setTimeElapsed] = useState<number>(0);

    const startStopwatch = () => {
        intervalRef.current 
            ? null
            : intervalRef.current = setInterval(() => setTimeElapsed(t => t + 0.01), 10); 
    }

    const stopStopwatch = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }

    const addLap = () => {
        return
    }

    const resetStopwatch = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTimeElapsed(0);
    }

    return (
        <div>
            <StopWatch time={Number(timeElapsed.toFixed(2))} />
            <div>
                <StopWatchButton label={"start"} handleButtonClick={() => startStopwatch()} />
                <StopWatchButton label={"stop"} handleButtonClick={() => stopStopwatch()} />
                <StopWatchButton label={"lap"} handleButtonClick={() => addLap()} />
                <StopWatchButton label={"reset"} handleButtonClick={() => resetStopwatch()} />
            </div>
        </div>
    )
}

export default App;