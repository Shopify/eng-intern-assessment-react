/**
 * @file App.tsx
 * @desc React component to display the Stopwatch app
 * @author Hadi Naqvi
 */

import React, { useState, useEffect, useRef } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import { formatTime } from './StopWatchUtils';
import { containerStyle, buttonsContainerStyle, titleStyle } from './styles';


/**
 * App component to be rendered onto the index page
 * @returns {JSX.Element} - React component that displays a stopwatch with various buttons to control it
 */
export default function App() {
    const [isRunning, setRunning] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [laps, setLaps] = useState<number>(0);
    const lastTimestampRef = useRef<number>(0);
    const animationFrameRef = useRef<number>();

     // Stopwatch timer
     useEffect(() => {
        const animate = (timestamp: number) => {
            if (isRunning) {
                if (!startTime) {
                    setStartTime(timestamp);
                }

                const elapsedSinceLastUpdate = timestamp - lastTimestampRef.current;
                setElapsedTime((prevElapsedTime) => prevElapsedTime + elapsedSinceLastUpdate);

                lastTimestampRef.current = timestamp;
                animationFrameRef.current = requestAnimationFrame(animate);
            }
        };

        const startAnimation = () => {
            lastTimestampRef.current = performance.now();
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        if (isRunning) {
            startAnimation();
        } 
        else {
            cancelAnimationFrame(animationFrameRef.current as number);
        }

        return () => {
            cancelAnimationFrame(animationFrameRef.current as number);
        };
    }, [isRunning, startTime, lastTimestampRef, animationFrameRef]);

    /**
     * Function which starts and stops the stopwatch
     */
    const startStopTime = () => {
        setRunning(!isRunning);
        if (!isRunning && elapsedTime !== 0) {
            // Reset last timestamp when starting again
            lastTimestampRef.current = performance.now();
        }
    };

    /**
     * Function which resets the stopwatch time and lap counter
     */
    const resetStopWatch = () => {
        setRunning(false);
        setStartTime(null);
        setElapsedTime(0);
        setLaps(0);
    }

    /**
     * Function which increments the lap counter
     */
    const countLap = () => {
        // By default the lap count wraps back around to 0 if it gets too high
        laps === Number.MAX_SAFE_INTEGER ? setLaps(0) : setLaps(laps + 1);
    }

    return(
        <>
        {/* Removes default margin/padding of HTML pages */}
        <style>{"body, html {margin: 0; padding: 0; background-color: #2E3440;"}</style>
        
        <div style={containerStyle}>
            <h1 style={titleStyle}>Stopwatch</h1>
            <StopWatch time={formatTime(elapsedTime)} laps={laps}/>

            <div style={buttonsContainerStyle}>
                <StopWatchButton colour={isRunning ? "red" : "green"} name={isRunning ? "Stop" : "Start"} onClick={startStopTime}/>
                <StopWatchButton colour={"blue"} name={"Reset"} onClick={resetStopWatch}/>
                <StopWatchButton colour={"blue"} name={"Lap"} onClick={countLap}/>
            </div>

        </div>
        </>
    )
}