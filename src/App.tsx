//The main component that renders the stopwatch and handles its functionality.

import React, { CSSProperties, useState, useEffect } from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import Lap from './Lap'

export default function App() {

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState<number[]>([]); 

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => { //updates the time every second if the start button is clicked
                setTime(prevTime => prevTime + 1)
            }, 1000);
        } else if (!isRunning && time !== 0) { //stops the timer if the stop button is clicked
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, time]); //only updates when isRunning or time changes

    const start = () => setIsRunning(true); 
    const stop = () => setIsRunning(false);
    const reset = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]); //clear recorded laps
    };
    const lap = () => {
        setLaps([...laps, time]); 
    };

    const background: CSSProperties = { //used to style the background
        height: '97vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    };

    const fixedHeightDiv: CSSProperties = { //keeps the stopwatch and buttons in the same position when the lap times are displayed
        height: '200px',
    };

    return( //renders the stopwatch, buttons, and lap times
        <div style = {background}>
            <div style = {fixedHeightDiv}>

                <StopWatch time={time}/>

                <StopWatchButton start = {start} stop = {stop} reset = {reset} lap = {lap}/>

                {laps.map((lap: number, index: number) => ( 
                        <Lap key = {index} time = {lap}/> //creates a new lap component for each lap recorded
                ))}

            </div>
        </div>
    )
}
