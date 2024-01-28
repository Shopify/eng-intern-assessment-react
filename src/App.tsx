import React, { useState, useEffect, useRef } from 'react';
import StopWatch from './components/StopWatch';
import StopWatchButton from './components/StopWatchButton';
import './assets/Style.css';

/**
 * App component that renders the stopwatch and control buttons.
 */
export default function App() {
    // State variables for managing stopwatch functionality
    const [elapsed, setElapsed] = useState<number>(0);
    const [isRunning, setIsRunning] = useState(false);
    const [lapTimes, setLapTimes] = useState<number[]>([]);
    const [lapStartTime, setLapStartTime] = useState<number | null>(null);

    // Ref for scrolling to the bottom of lap times container
    const lapTimesContainerRef = useRef<HTMLDivElement>(null);

    // Effect hook to update elapsed time every 10 milliseconds when the stopwatch is running
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

    // Function to format time in minutes, seconds, and milliseconds
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);

        const pad = (value: number) => (value < 10 ? `0${value}` : value);

        return `${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
    };

    // Handler for start/stop button click
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

    // Handler for lap button click
    const handleLapClick = () => {
        if (lapStartTime !== null) {
            const lapTime = Date.now() - lapStartTime;
            setLapTimes([...lapTimes, lapTime]);
            setLapStartTime(Date.now());

            // Scroll to the bottom of lap times container
            if (lapTimesContainerRef.current) {
                lapTimesContainerRef.current.scrollTop = lapTimesContainerRef.current.scrollHeight;
            }
        }
    };

    // Handler for reset button click
    const handleResetClick = () => {
        setIsRunning(false);
        setElapsed(0);
        setLapTimes([]);
        setLapStartTime(null);
    };

    // Render the stopwatch and control buttons
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
