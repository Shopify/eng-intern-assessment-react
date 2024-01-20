import React, { useState, useEffect } from 'react';
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
        let startTime: number;
        if (timerOn) {
            startTime = Date.now();
            // Every 1ms setInterval is called and increments the previous time value by 1 second.
            interval = setInterval(() => {
                setTime(Date.now() - startTime);
            },1);
        }
        // Cleanup function to clear the interval when the timer state changes.
        return () => {
            if (interval) {
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
    const onLapClick = () => {
        // Create laps array and append new lap time to the end when
        // setLaps is called when re-rendering a new state.
        setLaps([...laps, time]);
        console.log('Lap Button Clicked')
    };

    const formatTime = (timeValue: number) => {
        // Use template literal to prefix 0 or 00 to each unit of time, i.e 9 seconds becomes 09. 
        // Mod time by 1000/1000/60000/60000 to calculate remaining ms/seconds/minutes/hour as the 
        // remainder, and slice to show ms as 3 digits, sec/min/hours as 2 digits.
        const milliseconds = `00${timeValue % 1000}`.slice(-3);
        const seconds = `0${Math.floor((timeValue / 1000) % 60)}`.slice(-2);
        const minutes = `0${Math.floor((timeValue / 60000) % 60)}`.slice(-2);
        const hours = `0${Math.floor(timeValue / 3600000)}`.slice(-2);

        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    return (
        <div className="App">
            <span className='header'>Stopwatch</span>
            <StopWatch timer={formatTime(time)} />
            <StopWatchButton
                onStart={() => onStartClick()}
                onStop={() => onStopClick()}
                onReset={() => onResetClick()}
                onLap={() => onLapClick()}
            />
            {
                // If a lap is recorded, display lap container
                laps.length > 0 && (
                    <div className="laps-container">
                        <div className="laps-header">
                            <div className="lap-number-header">Lap#</div>
                            <div className="lap-time-header">Lap Time</div>
                        </div>
                        {
                            // Iterate through elements in the laps array and display the lap number 
                            // and the recorded lap time.
                            laps.map((lap, index) => (
                                <div key={index} className="lap">
                                    <div className="lap-number">{index + 1}</div>
                                    <div className="lap-time">{formatTime(lap)}</div>
                                </div>
                            ))}
                    </div>

                )}
        </div>
    )
}