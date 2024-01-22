// The main component that renders the stopwatch and handles its functionality
import React, {useState, useEffect, useRef} from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import '../styles/App.css'
export default function App() {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalID = useRef(null);
    const [reset, setReset] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [lapTime, setLapTime] = useState(0);
    const [laps, setLaps] = useState([]);


    // Handler for reset button
    const resetHandler = () => {
        setReset(true);
    }

    // Handler for start/stop button
    const runningHandler = () => {
        setIsRunning(!isRunning);
    }

    // Handler for lap button
    const lapHandler = () => {
        setLaps([ ... laps, { id: laps.length + 1, time: formatTime(lapTime)} ]);
        setLapTime(0);
    }

    // Padding zero to timer for display
    const padZero = (n : number) => {
        if (n < 10) {
            return `0${n}`
        }

        return `${n}`
    }

    // Converts milliseconds to time in form of minutes:second.milliseconds
    const formatTime = (time: number) => {

        let seconds = padZero(Math.floor(time / 1000) % 60);
        let minutes = padZero(Math.floor(time / 1000 / 60));
        let milliseconds = padZero(Math.floor((time % 1000) / 10));

        return `${minutes}:${seconds}.${milliseconds}`
    }

    // callback for timer
    useEffect(() => {

        // If the timer is running, then use setInterval to update the time and current lap time
        if (isRunning) {
            setStartTime(Date.now());
            intervalID.current = setInterval(() => {
                let deltaTime = Date.now() - startTime;
                setElapsedTime((time) => time + deltaTime); 
                setLapTime((time) => time + deltaTime);
            }, 10);
        }
        else {
            clearInterval(intervalID.current); // Clear the interval ID
        }

        // If the reset button is pressed, then reset everything
        if (reset) {
            setReset(false);
            setIsRunning(false);
            setElapsedTime(0);
            setLapTime(0);
            setLaps([])
            clearInterval(intervalID.current );
        }

        return () => clearInterval(intervalID.current);
    }, [isRunning, reset, startTime, elapsedTime])

    return(
        <div className="body">
            <StopWatch elapsedTime={formatTime(elapsedTime)}></StopWatch>
            <StopWatchButton isRunning={isRunning} runningHandler={runningHandler} resetHandler={resetHandler} lapHandler={lapHandler}></StopWatchButton>
            <p> Lap: {formatTime(lapTime)}</p>
            <ul data-testid="lap-list">
                { laps.map((lap) => 
                <li key={lap.id}>
                    Lap {lap.id}: {lap.time}
                </li>)}
            </ul>
            
        
        </div>
    )
}