import React, { useState, useEffect, Dispatch, SetStateAction, useRef } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import '../Style.css';


export default function App() {
    const [elapsed, setElapsed] = useState<number>(0);
    const [isRunning, setIsRunning] = useState(false);
    const [lapTimes, setLapTimes] = useState<number[]>([]);
    const [lapStartTime, setLapStartTime] = useState<number | null>(null);

    const lapTimesContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
    
        if (isRunning) {
            const startTime = Date.now() - elapsed;
            interval = setInterval(() => {
                const newElapsed = Date.now() - startTime;
                setElapsed(newElapsed);
            }, 10);
        } else {
            if (interval !== undefined) {
                clearInterval(interval);
            }
        }
    
        return () => {
            if (interval !== undefined) {
                clearInterval(interval);
            }
        };
    }, [isRunning, elapsed, setElapsed]);
    

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);

        const pad = (value: number) => (value < 10 ? `0${value}` : value);

        return `${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
    };

    const handleStartStopClick = () => {
        if (isRunning) {
            setIsRunning(false);
            setLapStartTime(null);
        } else {
            setIsRunning(true);
            if (lapStartTime === null) {
                setLapStartTime(Date.now() - elapsed);
            }
        }
    };

    const handleLapClick = () => {
        if (lapStartTime !== null) {
            const lapTime = Date.now() - lapStartTime;
            setLapTimes([...lapTimes, lapTime]);
            setLapStartTime(Date.now());

            if (lapTimesContainerRef.current) {
                lapTimesContainerRef.current.scrollTop = lapTimesContainerRef.current.scrollHeight;
            }
        }
    };

    const handleResetClick = () => {
        setIsRunning(false);
        setElapsed(0);
        setLapTimes([]);
        setLapStartTime(null);
    };

    return (
        <>
            <StopWatch elapsed={elapsed} formatTime={formatTime} lapTimes={lapTimes} lapTimesContainerRef={lapTimesContainerRef} />
            <StopWatchButton
                isRunning={isRunning}
                handleStartStopClick={handleStartStopClick}
                handleLapClick={handleLapClick}
                handleResetClick={handleResetClick}
            />
        </>
    );
}