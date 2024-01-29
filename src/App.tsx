import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import StopWatch from './components/StopWatch';
import StopWatchButton from './components/StopWatchButton';
import LapTimesList from './components/LapTimesList';

function App() {
    // referencing the interval ID
    const intervalRef = useRef<NodeJS.Timeout>(null);
    // the time displayed on the stopwatch
    const [timeElapsed, setTimeElapsed] = useState<number>(0);
    // an array to store the lap times
    const [lapTimes, setLapTimes] = useState<number[]>([]);
    // the sum of previous lap times, used to calculate each new lap time
    const [lapTimesSum, setLapTimesSum] = useState<number>(0);
    // declaring possible stopwatch states
    type StopwatchState = 'reset' | 'started' | 'stopped';
    const [stopwatchState, setStopwatchState] = useState<StopwatchState>('reset');

    // updating lapTimesSum each time a new lap is recorded
    useEffect(() => {
        setLapTimesSum(lapTimes.reduce((a, b) => a + b, 0));
    }, [lapTimes])

    // if stopwatch is not running, start/resume timing and update stopwatch state
    // timeElapsed is increased by 10 milliseconds at 10 millisecond intervals
    const startStopwatch = () => {
        intervalRef.current 
            ? null
            : intervalRef.current = setInterval(() => setTimeElapsed(t => t + 10), 10);
        setStopwatchState('started');
    }

    // stop the stopwatch and update state to 'stopped'
    // interval will stop adding to timeElapsed when stopwatch is stopped
    // but timeElapsed is not reset unless resetStopwatch is called
    const stopStopwatch = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setStopwatchState('stopped');
    }

    // if the stopwatch has been running, 
    // record a new lap and add it to the lapTimes array. 
    // calculate the new lap time by subtracting the 
    // sum of the previous lap times from the total time elapsed
    const recordLap = () => {
        timeElapsed ? setLapTimes(prevLaps => [...prevLaps, (timeElapsed - lapTimesSum)]) : null;    
    }

    // reset the stopwatch by clearing the interval ID and
    // setting all states to their default values
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
            <LapTimesList lapTimes={lapTimes} />
        </div>
    )
}

export default App;