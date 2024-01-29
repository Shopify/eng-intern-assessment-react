import './App.css';
import React, { useState, useRef } from 'react';
import StopWatch from './components/StopWatch';
import StopWatchButton from './components/StopWatchButton';
import formatTime from './utils/formatTime';

function App() {
    const intervalRef = useRef<NodeJS.Timeout>(null);
    const [timeElapsed, setTimeElapsed] = useState<number>(0);
    const [lapTimes, setLapTimes] = useState<number[]>([]);

    const startStopwatch = () => {
        intervalRef.current 
            ? null
            : intervalRef.current = setInterval(() => setTimeElapsed(t => t + 10), 10); 
    }

    const stopStopwatch = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }

    const recordLap = () => {
        timeElapsed ? setLapTimes(prevLaps => [...prevLaps, timeElapsed]) : null;
    }

    const resetStopwatch = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTimeElapsed(0);
        setLapTimes([]);
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
                    handleButtonClick={() => recordLap()} 
                />
                <StopWatchButton 
                    label='reset' 
                    handleButtonClick={() => resetStopwatch()} 
                />
            </div>
            <div className='lapTimesContainer digital'>
                <ol>
                    {lapTimes.map((lap, i) => {
                        return (
                            <li key={i + 1} className='lap'>Lap {i < 9 ? `0${i + 1}` : i + 1}: {formatTime(lap)}</li>
                        )
                    })}
                </ol>
            </div>
        </div>
    )
}

export default App;