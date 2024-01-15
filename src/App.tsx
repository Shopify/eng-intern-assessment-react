// Overall app
// TODO:
// - add stopwatch display functionality (ie. just counting up time) - done
// - add start functionality - done
// - add stop functionality - done
// - add reset functionality - done
// - add lap functionality
import React, {useState, useEffect} from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
export default function App() {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [intervalID, setIntervalID] = useState(null);
    const [reset, setReset] = useState(false);

    const resetHandler = () => {
        setReset(true);
    }

    const runningHandler = () => {
        setIsRunning(!isRunning);
    }

    // TODO: Use Date.now() or similar to keep track of time
    useEffect(() => {
        if (isRunning) {
            setIntervalID(setInterval(() => {
                setElapsedTime((time) => time + 1) 
            }, 10));
        }
        else {
            clearInterval(intervalID);
        }
        if (reset) {
            setReset(false);
            setIsRunning(false);
            setElapsedTime(0);
            clearInterval(intervalID);
        }

        return () => clearInterval(intervalID);
    }, [isRunning, reset])

    return(
        <div>
            <StopWatch elapsedTime={elapsedTime}></StopWatch>
            <StopWatchButton isRunning={isRunning} runningHandler={runningHandler} resetHandler={resetHandler}></StopWatchButton>
        </div>
    )
}