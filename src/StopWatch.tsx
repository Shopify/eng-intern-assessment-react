import React, { useEffect, useRef, useState } from 'react'
import StopWatchButton from './StopWatchButton'

export default function StopWatch() {
    const [running, setRunning] = useState(false);
    const [reset, setReset] = useState(true);

    const [time, setTime] = useState(0);
    const startTime = useRef<number>(0);

    const handleRunning = () => {
        setRunning(!running);
        setReset(false);
    }

    const handleReset = () => {
        if (reset) {
            // do nothing
        } else if (!reset && running) {
            // lap
        } else if (!reset) {
            // reset
            setReset(true);
            setTime(0);
        }
    }

    useEffect(() => {
        let timer: NodeJS.Timer;
        if (running) {
          startTime.current = Date.now() - time;
          timer = setInterval(() => {
            setTime(Date.now() - startTime.current);
          }, 1);
        }
    
        return () => clearInterval(timer);
      }, [running]);


    const formatTime = (time: number) => {
        const minutes = (Math.floor(time / 60000)).toString();
        const seconds = (Math.floor((time % 60000) / 1000)).toString();
        const milliseconds = (Math.floor((time % 1000) / 10)).toString();

        return `${minutes.padStart(2, '0') + ":" + seconds.padStart(2, '0') + "." + milliseconds.padStart(2, '0')}`;
    }

    return(
        <div>
            <div>
                <h1>Shopify StopWatch</h1>
                <div>
                    <p>{formatTime(time)}</p>
                </div>
            </div>
            <div>
                <StopWatchButton title={reset || running ? "Lap" : "Reset"} onClick={handleReset}/>
                <StopWatchButton title={running ? "Stop" : "Start"} onClick={handleRunning}/>
            </div>
        </div>
    )
}