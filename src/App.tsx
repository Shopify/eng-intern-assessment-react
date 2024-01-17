//The main component that renders the stopwatch and handles its functionality.

import React, { CSSProperties, useState, useEffect } from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import Lap from './Lap'

export default function App() {

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState<number[]>([]); // Declare 'laps' state variable

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1)
            }, 1000);
        } else if (!isRunning && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, time]);

    const start = () => setIsRunning(true);
    const stop = () => setIsRunning(false);
    const reset = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]); // Use 'setLaps' to update the 'laps' state
    };
    const lap = () => {
        setLaps([...laps, time]); // Use 'setLaps' to update the 'laps' state
    };

    const background: CSSProperties = {
        height: '97vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    };

    const fixedHeightDiv: CSSProperties = {
        height: '200px',
    };

    return(
        <div style = {background}>
            <div style = {fixedHeightDiv}>

                <StopWatch time={time}/>

                <StopWatchButton start = {start} stop = {stop} reset = {reset} lap = {lap}/>

                {laps.map((lap: number, index: number) => (
                        <Lap key={index} time={lap}/>
                ))}

            </div>
        </div>
    )
}
