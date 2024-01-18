/**
 * SHOPIFY REACT INTERN ASSESSMENT SUMMER 2024
 * 
 * Written by David Kochanski
 * https://github.com/davidkochanski/eng-intern-assessment-react
 */

import React, { useEffect } from 'react'
import "./stopwatch.css"
import StopWatchButton from './StopWatchButton';
import { useState, useMemo } from 'react'

export default function StopWatch() {
    const [startTime, setStartTime] = useState(Date.now());
    const [deltaTime, setDeltaTime] = useState(Date.now());
    const [displayingTime, setDisplayingTime] = useState(0);
    const [isPaused, setPaused] = useState(true);
    const [laps, setLaps] = useState([]);

    useEffect(() => {
        // The interval runs every 10 milliseconds. This can be decreased but
        // this accuracy should be good enough for this example.
        // Because JS is not perfect, then it won't be exactly 10ms intervals,
        // it just refreshes by grabbing the new timestamp every 10ms.
        const intervalId = setInterval(() => {
            if(!isPaused)  {
                setDisplayingTime(Date.now() - startTime);
            }
        }, 10);
    
        // stop the clock  when paused
        return () => clearInterval(intervalId);
    }, [isPaused, startTime]);

    /**
     * Starts the stopwatch timer.
     */
    const handleStart = () => {
        if (isPaused) {
            // This calculation is for the offset in starting time when unpausing the stopwatch.
            // Continue off from what displayingTime is instead of the startTime.
            setStartTime(prevTime => prevTime + Date.now() - (prevTime + displayingTime));
            setPaused(false);
        }
    };

    /**
     * Stops (pauses) the stopwatch timer.
     */
    const handleStop = () => {
        // When we stop, take a snapshot of when we stopped so that we
        setPaused(true);
    }

    /**
     * Resets the time displayed.
     */
    const handleReset = () => {
        setPaused(true);
        setDisplayingTime(0);
        setLaps([]);
    }

    /**
     * Creates a lap on the timer.
     */
    const handleLap = () => {
        setLaps([...laps, displayingTime]);
    };

    /**
     * Nicely formats the displaying time.
     * 
     * @param {number} num: the time to be formatted (in milliseconds)
     * @returns {string} a string with the formatted time.
     */
    const formatTime = (num: number): string => {
        const HOURS_TO_MILLISECONDS = 3600 * 1000;
        const MINUTES_TO_MILLISECONDS = 60 * 1000;

        // Get each time amount
        const hours = Math.floor(num / HOURS_TO_MILLISECONDS);
        const minutes = Math.floor((num % HOURS_TO_MILLISECONDS) / MINUTES_TO_MILLISECONDS);
        const seconds = Math.floor((num % HOURS_TO_MILLISECONDS) / 1000);
        const decimal = num % 1000;

        return `${padWithZeros(hours, 2)}:${padWithZeros(minutes, 2)}:${padWithZeros(seconds, 2)}.${padWithZeros(decimal, 3)}`;
    }

    /**
     * Pad a number with leading zeros to a specified length.
     * 
     * @param {number}  num the number to be padded
     * @param {number} size the number of characters for this number
     * @returns {string} `num` padded with leading zeros to be of `size` chars long
     */
    const padWithZeros = (num: number, size: number): string => {
        let s = num.toString();
        while (s.length < size) s = "0" + s;
        return s;
    };

    return(
        <div className="stopwatch">
            <div className="stopwatch-display">{formatTime(displayingTime)}</div>

            {/* The clickable buttons. Each one has it's own label, event handler, and condition on when it's visibly pressed */}
            <div className="stopwatch-button-grid">
                <StopWatchButton label={"Start"} isPressed={!isPaused} onPress={handleStart}></StopWatchButton>
                <StopWatchButton label={"Stop"} isPressed={isPaused} onPress={handleStop}></StopWatchButton>
                <StopWatchButton label={"Reset"} isPressed={false} onPress={handleReset}></StopWatchButton>
                <StopWatchButton label={"Lap"} isPressed={false} onPress={handleLap}></StopWatchButton>
            </div>

            {/* Where all the laps will be */}
            {/* If there are no laps to display, then don't display anything. Hooray for short circuiting! */}
            {/* useMemo hook so he laps are only rerended when a lap is added (or the watch is reset) */}
            {useMemo(() => (
                laps.length > 0 && (
                    <div className="stopwatch-lap-array">
                        {laps.map((lapTime, index) => (
                            <div key={index} className="lap-row">
                                <div className="lap-index">Lap {index + 1}:</div> 
                                <div className="lap-time">{formatTime(lapTime - (laps[index - 1] ?? 0))}</div>
                            </div>
                        ))}
                    </div>
                )
            ), [laps])}
        </div>
    )
}