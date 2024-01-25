/* 
    App renders the entire display, including the StopWatch and StopWatchButton components.
*/

// import React hooks, components and CSS file
import React, { useState, useRef } from 'react';
import Stopwatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import "./App.css";

export default function App() {
    /* 
        We want to keep track of the following things: 
        - isRunning tracks the state of the clock and if it should be elapsing 
        - laps tracks the actual lap data (Lap 1, Lap 2, etc.)
        - runningTime tracks the actual clock value 
        - lastTime stores the time that the last lap was recorded (allows us to output the intervals)
        - stopwatchRef allows us to reference the interval ID when the stopwatch runs
    */
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const [runningTime, setRunningTime] = useState<number>(0);
    const [lastTime, setLastTime] = useState<number>(0);
    const stopwatchRef = useRef<number | null>(null);

    // starting the stopwatch (set the interval, start the clock)
    const startStopwatch = () => {
        if (!isRunning) {
        stopwatchRef.current = window.setInterval(() => {
            setRunningTime((prevTime) => prevTime + 1000);
        }, 1000);
        } else {
        window.clearInterval(stopwatchRef.current);
        }
        setIsRunning(!isRunning);
    };

    // resetting the stopwatch (should reset all values to default)
    const resetStopwatch = () => {
        window.clearInterval(stopwatchRef.current);
        setLaps([]);
        setIsRunning(false);
        setRunningTime(0);
        setLastTime(0);
    };

    // record a lap (current time - last time) into laps and update last time accordingly
    const recordLap = () => {
        if (isRunning) {
        const currentTime = runningTime;
        const lapDifference = currentTime - lastTime;
        setLastTime(currentTime);
        setLaps((prevLaps) => [lapDifference, ...prevLaps]);
        }
    };

    /* 
        Render the stopwatch as follows
        1. Display the buttons which will change depending on the state of the clock
        2. Display the running time (should be 0 before the user presses start)
        3. Display the lap data in ascending order (most recent lap # is at the top)
            - This should start empty and gradually fill up. Resetting will clear it 
            from the screen.
    */
    return (
        <div className="container">
            <div className="stopwatch">
                <StopWatchButton
                isRunning={isRunning}
                onStartStopClick={startStopwatch}
                onResetLapClick={isRunning ? recordLap : resetStopwatch}
                />  
                <Stopwatch isRunning={isRunning} laps={laps} runningTime={runningTime} />
            </div>
        </div>
    );
}

