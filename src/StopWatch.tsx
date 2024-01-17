import React, { useEffect, useRef, useState } from 'react'
import StopWatchButton from './StopWatchButton'
import "./styles/StopWatch.css"

export default function StopWatch() {
    const startTime = useRef<number>(0);
    const [running, setRunning] = useState<boolean>(false);
    const [reset, setReset] = useState<boolean>(true);
    const [laps, setLaps] = useState<number[]>([]);
    const [time, setTime] = useState<number>(0);

    const handleRunning = () => {
        setRunning(!running);
        setReset(false);
    }

    const handleReset = () => {
        if (!reset && running) {
            setLaps((laps) => [...laps, time]);
        } else if (!reset) {
            setReset(true);
            setTime(0);
            setLaps([]);
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
        <div className="stopwatch-container">
            <div className="stopwatch">
                <h1>Shopify StopWatch</h1>
                <div data-testid='timer'>
                    <p>{formatTime(time)}</p>
                </div>
            </div>
            <div className="buttons">
                <StopWatchButton title={reset || running ? "Lap" : "Reset"} onClick={handleReset}/>
                <StopWatchButton title={running ? "Stop" : "Start"} onClick={handleRunning}/>
            </div>
            <div className="laps">
                {laps.length > 0 && (
                    <ul data-testid='list-laps'>
                        {laps.map((lap, index) => (
                            <li key={lap}>
                                <p className="lap-num">Lap{" " + (index + 1)}</p>
                                <p>{formatTime(lap)}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}