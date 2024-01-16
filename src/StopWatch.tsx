import React, {useState, useEffect} from 'react'
import StopWatchButton from "./StopWatchButton";
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;


export default function StopWatch() {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState<string[]>([]);
    const [lastLapTime, setLastLapTime] = useState(0);

    const toggleStartStop = () => {
        setIsRunning(!isRunning);
    }

    const lapReset = () => {
        if (isRunning) {
            const currentTime = elapsedTime
            const lapTime = currentTime - lastLapTime;
            setLaps(prevLaps => [...prevLaps, formatTime(lapTime)]);
            setLastLapTime(lapTime + lastLapTime);
        } else {
            setIsRunning(false);
            setElapsedTime(0);
            setLaps([]);
        }
    }


    // Time elapsing and resetting
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                setElapsedTime((prevElapsedTime) => prevElapsedTime + 10);
            }, 10);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = (time % 1000) / 10;

        // mm:ss:msms
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    };


    return (
        <React.Fragment>
            <div>
                <h1>{formatTime(elapsedTime)}</h1>
            </div>
            <div>
                <StopWatchButton buttonName={isRunning ? "Stop" : "Start"}
                                 buttonFunction={toggleStartStop}
                                 disabled={false}
                />
                <StopWatchButton buttonName={isRunning ? "Lap" : (laps.length > 0 ? "Reset" : "Lap")}
                                 buttonFunction={lapReset}
                                 disabled={laps.length === 0 && !isRunning}
                />
            </div>
            <div>
                <ul>
                    {laps.map((lap, index) => (
                        <li key={index}>{lap}</li>
                    ))}
                </ul>
            </div>
        </React.Fragment>
    )
}