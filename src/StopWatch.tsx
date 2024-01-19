import React, { useEffect } from 'react'
import { useState } from 'react'
import StopWatchButton from './StopWatchButton';

function displayTimerValue(value:number) {
    return value.toString().padStart(2, "0")
}

function formatTime(time:number) {
    let milliseconds = time % 100;
    time = (time - milliseconds) / 100;
    let seconds = time % 60;
    time = (time - seconds) / 60;
    let minutes = time % 60;
    let hours = (time - minutes) / 60;

    return `${displayTimerValue(hours)}:${displayTimerValue(minutes)}:${displayTimerValue(seconds)}.${displayTimerValue(milliseconds)}`
}

export default function StopWatch() {
    const [time, setTime] = useState(0);
    const [active, setActive] = useState(false);
    const [laps, setLaps] = useState([]);

    const startClicked = () => {
        setActive(true);
    }

    const stopClicked = () => {
        setActive(false);
    }

    const resetClicked = () => {
        setActive(false);
        setTime(0);
        setLaps([]);
    }

    const lapClicked = () => {
        if (active) {
            setLaps(laps => [...laps, time])
        }
    }

    useEffect(() => {
        let addTime: NodeJS.Timeout;
        if (active) {
            addTime = setInterval(() => setTime(time + 1), 10);
        }
        return () => clearInterval(addTime)
    }, [time, active]);

    return(
        <div>
            <p>{formatTime(time)}</p>
            <StopWatchButton buttonAction={startClicked} buttonName="start" />
            <StopWatchButton buttonAction={stopClicked} buttonName="stop" />
            <StopWatchButton buttonAction={resetClicked} buttonName="reset" />
            <StopWatchButton buttonAction={lapClicked} buttonName="lap" />
            <ol>
                {laps.map((lap, index) => <li key={index}>Lap #{index + 1}: {formatTime(lap)}</li>)}
            </ol>
        </div>
    )
}