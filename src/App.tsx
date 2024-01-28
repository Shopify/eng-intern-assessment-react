import React from 'react'
import StopWatch from './StopWatch'

import { useState, useRef} from 'react'
import '../styles.css'

export default function App() {
    const [time, setTime] = useState<number>(0)
    const [currentTime, setCurrentTime] = useState(null)
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [lap, setLap] = useState<number[]>([]);
    const intervalRef = useRef(null)


    //feel like this is a candidate for useEffect...?
    //starting the timer
    const handleStart = () => {
        if (!isRunning) {
            setCurrentTime(Date.now())
        }
        setIsRunning(true);
        setTime(Date.now())
        //note to self this is where the 'actual' timer is
        intervalRef.current = setInterval(() => {
            setTime(Date.now())
        }, 10)
    };
    //stopping timer
    const handleStop = () => {
        clearInterval(intervalRef.current)
        setIsRunning(false);
        console.log(intervalRef.current)
    };
    //resetting timer
    const handleReset = () => {
        if (isRunning) {
            clearInterval(intervalRef.current)
        }

        setTime(0);
        setCurrentTime(0);
        setLap([])
        setIsRunning(false);
    };
    //adding lap times to an array
    const handleLap = () => {
        //made it so a lap cannot be added if the timer is not running
        if (isRunning)  
        {
            const lapTime = Date.now() - currentTime;
            setLap((previousLap: any) => [...previousLap, lapTime]);
        }
    }

    //making the time much more savoury to look at
    let elapsed = (time - currentTime) / 1000;

    return(
        <div className = 'stopwatch'>
            <div className = 'border'>
            <h1>{elapsed.toFixed(2)}s</h1>
            <div className = 'buttons'>
            {/* where the magic happens */}
            <StopWatch          handleStart={handleStart}
            handleStop={handleStop}
            handleLap={handleLap}
            handleReset={handleReset} />
            </div>
            </div>
            <ul>
                {/* after laps are pushed to array by handleLap, array is mapped over and rendered to page */}
                {lap.map((lapTime, index) => (
          <li key={index}>{`Lap ${index + 1}: ${ (lapTime / 1000).toFixed(2)}s`}</li>
        ))}
            </ul>
        </div>
    )
}

