import './App.css';
import React, { useState, useRef } from 'react'
import StopWatch from './components/StopWatch'
import StopWatchButton from './components/StopWatchButton'

function App() {
    const intervalRef = useRef<NodeJS.Timeout>(null);
    const [timeElapsed, setTimeElapsed] = useState<number>(0);

    const startStopwatch = () => {
        intervalRef.current 
            ? null
            : intervalRef.current = setInterval(() => setTimeElapsed(t => t + 10), 10); 
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
        <div className='app'>
            <StopWatch time={timeElapsed} />
            <div className='buttonsContainer'>
                <StopWatchButton 
                    label='start' 
                    handleButtonClick={() => startStopwatch()} 
                />
                <StopWatchButton 
                    label='stop' 
                    handleButtonClick={() => stopStopwatch()} 
                />
                <StopWatchButton 
                    label='lap' 
                    handleButtonClick={() => addLap()} 
                />
                <StopWatchButton 
                    label='reset' 
                    handleButtonClick={() => resetStopwatch()} 
                />
            </div>
        </div>
    )
}

export default App;