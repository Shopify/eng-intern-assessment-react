// Overall app
// TODO:
// - add stopwatch display functionality (ie. just counting up time) - done
// - add start functionality - done
// - add stop functionality - done
// - add reset functionality - done
// - add lap functionality - done
// - add css
// - code cleanup
import React, {useState, useEffect, useRef} from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
export default function App() {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalID = useRef(null);
    const [reset, setReset] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [lapTime, setLapTime] = useState(0);
    const [laps, addLaps] = useState([]);

    const resetHandler = () => {
        setReset(true);
    }

    const runningHandler = () => {
        setIsRunning(!isRunning);
    }

    const padZero = (n : number) => {
        if (n < 10) {
            return `0${n}`
        }

        return `${n}`
    }

    // TEMPORARY: This is repeated from StopWatch file. 
    // TODO: Find a way to use this without repeating 
    const formatTime = (time: number) => {

        let seconds = padZero(Math.floor(time / 1000) % 60);
        let minutes = padZero(Math.floor(time / 1000 / 60));
        let milliseconds = padZero(Math.floor((time % 1000) / 10));

        return `${minutes}:${seconds}.${milliseconds}`
    }

    const lapHandler = () => {
        addLaps([ ... laps, { id: laps.length + 1, time: formatTime(lapTime)} ]);
        setLapTime(0);
    }

    useEffect(() => {
        if (isRunning) {
            setStartTime(Date.now());
            intervalID.current = setInterval(() => {
                setElapsedTime((time) => time + Date.now() - startTime); 
                setLapTime((time) => time + Date.now() - startTime);
            }, 10);
        }
        else {
            clearInterval(intervalID.current );
        }
        if (reset) {
            setReset(false);
            setIsRunning(false);
            setElapsedTime(0);
            clearInterval(intervalID.current );
        }

        return () => clearInterval(intervalID.current);
    }, [isRunning, reset, startTime, elapsedTime])

    return(
        <div>
            <StopWatch elapsedTime={elapsedTime}></StopWatch>
            <StopWatchButton isRunning={isRunning} runningHandler={runningHandler} resetHandler={resetHandler} lapHandler={lapHandler}></StopWatchButton>
            <p> Lap: {formatTime(lapTime)}</p>
            <ul>
                { laps.map((lap) => 
                <li key={lap.id}>Lap {lap.id}: {lap.time}</li>)}
            </ul>
        
        </div>
    )
}