import React, { useEffect, useState } from 'react'
import StopWatchButton from './StopWatchButton'

// stopwatch display

export default function StopWatch() {

    const [time, setTime] = useState(0)
    const [laps, setLaps] = useState([])
    const [isRunning, setIsRunning] = useState(false)

    // these functions gets the second, minutes and milliseconds of the stopwatch
    const getMinutes = (ms: number) => ("0" + Math.floor((ms / 60 / 1000) % 60)).slice(-2)
    const getSeconds = (ms: number) => ("0" + Math.floor((ms / 1000) % 60)).slice(-2)
    const getMilliSeconds = (ms: number) => ("0" + (ms / 10) % 100).slice(-2)

    // this function below formats the time to display on screen
    const formatTime = (ms: number) => `${getMinutes(ms)}:${getSeconds(ms)}:${getMilliSeconds(ms)}`

    // this useEffect sets the time interval in the stopwatch
    useEffect(() => {
        let interval: string | number | NodeJS.Timeout = null;

        if (isRunning) {
            interval = setInterval(() => setTime(time => time + 10), 10);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    // this useEffect handles the laps button/function in the stopwatch
    useEffect(() => {
        if (time) {
            const rest = laps.slice(0, laps.length - 1)
            let last = time - rest.reduce((acc, x) => acc + x, 0)
            setLaps([...rest, last])
        }
        else {
            setLaps([])
        }
    }, [time])

    return (
        <div>
            {/* The div below displays the time */}
            <div className="stopwatch-time">{formatTime(time)}</div>
            {/* The div below displays the button */}
            {/* It shows the start button first, once button is click it shows stop button and lap button to run laps */}
            {/* If you click stop, there is a option to resume the stopwatch or to reset the stopwatch to 0 */}
            <div className='button-container'>
                {!isRunning && !time && <StopWatchButton className="left-button" onClick={() => setIsRunning(true)} children="Start" />}
                {!isRunning && time > 0 && <StopWatchButton className="left-button" onClick={() => setIsRunning(true)} children="Resume" />}
                {isRunning && <StopWatchButton className="right-button" onClick={() => setIsRunning(false)} children="Stop" />}
                {isRunning && <StopWatchButton className="left-button" onClick={() => setLaps([...laps, 0])} children="Lap" />}
                {!isRunning && time > 0 && <StopWatchButton className="right-button" onClick={() => setTime(0)} children="Reset" />}
            </div>
            {/* this div below displays the laps time after the lap button is clicked on the display */}
            <div className="laps">
                {laps.map((x, i) => <div key={i} className='lap'>Lap {i + 1}: {formatTime(x)}</div>)}
            </div>
        </div>
    )
}