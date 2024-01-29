import React, { useEffect, useRef, useState } from 'react'
import StopWatchButton from './StopWatchButton';
import './StopWatch.css'
export enum Buttons {
    Start = 'Start',
    Lap = 'Lap',
    Stop = 'Stop',
    Reset = 'Reset'
}

export default function StopWatch() {
    const [time, setTime] = useState<number>(0);
    const [running, setRunning] = useState<boolean>(false);
    const [laps, setLaps] = useState<number[]>([]);
    const timerRef = useRef<ReturnType<typeof setInterval>>();

    const formatTime = (ms: number) => {
        // Calculations to turn ms to desired time unit, 
        // while ensuring that the at most 2 digits are displayed for each time value
        const getMinutes = () => ("0" + Math.floor((ms / 60 / 1000) % 60)).slice(-2);
        const getSeconds = () => ("0" + Math.floor((ms / 1000) % 60)).slice(-2);
        const getMilliSeconds = () => ("0" + (ms / 10) % 100).slice(-2);

        return `${getMinutes()}:${getSeconds()}.${getMilliSeconds()}`;
    }

    // Timer starts/stops depending on the our running state.
    useEffect(() => {
        if (running) {
            timerRef.current = setInterval(() => setTime(prevTime => prevTime + 10), 10);
        } else {
            clearInterval(timerRef.current);
        }
    }, [running]);

    useEffect(() => {
        if (time) {
            const prefix = laps.slice(0, laps.length - 1);
            const last = time - prefix.reduce((sum, curr) => curr + sum, 0);
            setLaps([...prefix, last]);
        } else {
            setLaps([]);
        }
    }, [time]);

    return (
        <div className='stopwatch'>
            <div className='time-display'>{formatTime(time)}</div>
            <div className='buttons'>
                <StopWatchButton onClick={() => setRunning(true)} type={Buttons.Start} />
                <StopWatchButton onClick={() => setLaps([...laps, 0])} type={Buttons.Lap} />
                <StopWatchButton onClick={() => setRunning(false)} type={Buttons.Stop} />
                <StopWatchButton onClick={() => setTime(0)} type={Buttons.Reset} />
            </div>
            <div className='laps'>
                <ul>
                    {laps.map((el, index) =>
                        <li key={index}>Lap {index + 1}: {formatTime(el)}</li>
                    )}
                </ul>
            </div>
        </div>
    )
}