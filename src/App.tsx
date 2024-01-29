import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import StopWatch from './components/StopWatch';
import StopWatchButton from './components/StopWatchButton';
import formatTime from './utils/formatTime';

function App() {
    const intervalRef = useRef<NodeJS.Timeout>(null);
    const [timeElapsed, setTimeElapsed] = useState<number>(0);
    const [lapTimes, setLapTimes] = useState<number[]>([]);
    const [lapTimesSum, setLapTimesSum] = useState<number>(0);

    type StopwatchState = 'reset' | 'started' | 'stopped';
    const [stopwatchState, setStopwatchState] = useState<StopwatchState>('reset');

    useEffect(() => {
        setLapTimesSum(lapTimes.reduce((a, b) => a + b, 0));
    }, [lapTimes])

    const startStopwatch = () => {
        intervalRef.current 
            ? null
            : intervalRef.current = setInterval(() => setTimeElapsed(t => t + 10), 10);
        setStopwatchState('started');
    }

    const stopStopwatch = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setStopwatchState('stopped');
    }

    const recordLap = () => {
        timeElapsed ? setLapTimes(prevLaps => [...prevLaps, (timeElapsed - lapTimesSum)]) : null;    
    }

    const resetStopwatch = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTimeElapsed(0);
        setLapTimes([]);
        setLapTimesSum(0);
        setStopwatchState('reset');
    }

    return (
        <div className='app'>
            <StopWatch time={timeElapsed} />
            <div className='buttonsContainer'>
                <StopWatchButton 
                    name='start' 
                    stopwatchState={stopwatchState}
                    handleButtonClick={() => startStopwatch()}
                />
                <StopWatchButton 
                    name='stop' 
                    stopwatchState={stopwatchState} 
                    handleButtonClick={() => stopStopwatch()}
                />
                <StopWatchButton 
                    name='lap' 
                    stopwatchState={stopwatchState} 
                    handleButtonClick={() => recordLap()}
                />
                <StopWatchButton 
                    name='reset' 
                    stopwatchState={stopwatchState} 
                    handleButtonClick={() => resetStopwatch()}
                />
            </div>
            <div className='lapTimesContainer digital'>
                <ol>
                    {lapTimes.map((lap, i) => {
                        return (
                            <li key={i + 1} className='lap'>
                                Lap {i < 9 ? `0${i + 1}` : i + 1}: {formatTime(lap)}
                            </li>
                        )
                    })}
                </ol>
            </div>
        </div>
    )
}

export default App;