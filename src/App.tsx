import React, {useState, useEffect } from 'react';
import './App.css';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';

export default function App() {
    // Time in seconds
    const [time, setTime] = useState(0); 
    // Stopwatch running state
    const [timerOn, setTimerOn] = useState(false); 
    // Array to store lap times
    const [laps, setLaps] = useState([]);

    useEffect(() => {
        // Dynamically set the return type of the setInterval function based on 
        // the JavaScript env, as it can return a NodeJS.Timeout object or a number.
        let interval: ReturnType<typeof setInterval> | number = null;
        if (timerOn) {
            // Every 1000ms setInterval is called and increments the previous time value by 1 second.
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
        // Cleanup function to clear the interval when the timer state changes.
        return () => {
            if(interval) {
                clearInterval(interval);
            }
        }
    // Dependecy array to prevent unnecessary executions, to ensure that the stopwatch 
    // reruns only when timerOn changes. 
    }, [timerOn]);
    
    const onStartClick = () => {
        setTimerOn(true);
        console.log('Start Button Clicked')
    };
    const onStopClick = () => {
        setTimerOn(false);
        console.log('Stop Button Clicked')
    };
    const onResetClick = () => {
        setTime(0);
        setTimerOn(false);
        setLaps([]);
        console.log('Reset Button Clicked')
    };
    const onLapClick= () => {
        // Create laps array and append new lap time to the end when
        // setLaps is called when re-rendering a new state.
        setLaps([...laps, time]);
        console.log('Lap Button Clicked')
    };

    const formatTime = () => {
        // Use template literal to prefix 0 to seconds i.e 9 seconds becomes 09, 
        // Then mod time by 60 to calculate remaining seconds as the remainder,
        // and slice the remainder by -2 to ensure each time unit is 2 digits.
        const getSeconds = `0${(time % 60)}`.slice(-2);
        // Divide elapsed time by 1 hour(60) and taking the floor, to calculate total minutes.
        const minutes = Math.floor(time / 60);
        // See comment for getSeconds
        const getMinutes = `0${(minutes % 60)}`.slice(-2);
        const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

        return `${getHours}:${getMinutes}:${getSeconds}`;
    }

    return(
        <div className = "App">
            <span className='header'>Stopwatch</span>
            <StopWatch timer={formatTime()}/>
            <StopWatchButton
                onStart= {() => onStartClick()}
                onStop= {() => onStopClick()}
                onReset= {() => onResetClick()} 
                onLap= {() => onLapClick()}
            />
        </div>
    )
}