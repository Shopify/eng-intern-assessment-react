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

    const formatTime = (timeInMilliseconds: number) => {
        const minutes = Math.floor((timeInMilliseconds % 3600000) / 60000);
        const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
        const milliseconds = Math.floor((timeInMilliseconds % 1000) / 10);

        const doubleDigits = (input: number) => {
            const output = input < 10 ? `0${input}` : input;
            return output;
        };

        return `${doubleDigits(minutes)}:${doubleDigits(seconds)}.${doubleDigits(milliseconds)}`;
    }

    return (
        <div>
            <StopWatch time={formatTime(timeElapsed)} />
            <div>
                <StopWatchButton label={'start'} handleButtonClick={() => startStopwatch()} />
                <StopWatchButton label={'stop'} handleButtonClick={() => stopStopwatch()} />
                <StopWatchButton label={'lap'} handleButtonClick={() => addLap()} />
                <StopWatchButton label={'reset'} handleButtonClick={() => resetStopwatch()} />
            </div>
        </div>
    )
}

export default App;