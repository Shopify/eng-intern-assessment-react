import React, {useState, useEffect} from 'react'
import StopWatchButton from "./StopWatchButton";


export default function StopWatch() {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const startTimer = () => {
        setIsRunning(true)
    };
    const stopTimer = () => {
        setIsRunning(false)
    };
    const resetTimer = () => {
        setIsRunning(false);
        setElapsedTime(0);
    }

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

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    };


    return (
        <React.Fragment>
            <div>
                <h1>{formatTime(elapsedTime)}</h1>
            </div>
            <div>
                <StopWatchButton buttonName={"Start"} buttonFunction={startTimer}></StopWatchButton>
                <StopWatchButton buttonName={"Stop"} buttonFunction={() => console.log("Stop")}></StopWatchButton>
                <StopWatchButton buttonName={"Reset"} buttonFunction={() => console.log("Reset")}></StopWatchButton>
                <StopWatchButton buttonName={"Lap"} buttonFunction={() => console.log("Lap")}></StopWatchButton>
            </div>
        </React.Fragment>
    )
}