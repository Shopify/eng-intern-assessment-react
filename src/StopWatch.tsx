import React, { useEffect } from 'react'
import "./stopwatch.css"
import StopWatchButton from './StopWatchButton';
import { useState } from 'react'

export default function StopWatch() {
    const [startTime, setStartTime] = useState(Date.now());
    const [deltaTime, setDeltaTime] = useState(0);
    const [displayingTime, setDisplayingTime] = useState(0);
    const [isPaused, setPaused] = useState(true);
    const [pausedAt, setPausedAt] = useState(Date.now());
    const [pausedFor, setPausedFor] = useState(0);

    useEffect(() => {
        // The interval runs every 10 milliseconds. This can be decreased but
        // this accuracy should be good enough for this example.
        setInterval(() => {
            setDeltaTime(Date.now());
        }, 10)
    })

    // Every time the deltaTime is updated, then the display should be updated.
    useEffect(() => {
        if(!isPaused)  {
            setDisplayingTime(deltaTime - startTime + pausedFor);
        }
    }, [deltaTime, isPaused])

    /**
     * Starts the stopwatch timer.
     */
    const handleStart = () => {
        if (isPaused) {
            // This calculation is for the offset in starting time
            // when unpausing the stopwatch.
            setStartTime(prevTime => prevTime + Date.now() - (prevTime + displayingTime));
            setPaused(false);
        }
    };

    /**
     * Stops (pauses) the stopwatch timer.
     */
    const handleStop = () => {
        // When we stop, take a snapshot of when we stopped so that we
        // can subtract that from the time generated by the deltaTime interval
        setPausedAt(Date.now());
        setPaused(true);

    }

    /**
     * Resets the time displayed.
     */
    const handleReset = () => {
        setPaused(true);
        setDisplayingTime(0);
    }

    /**
     * Creates a lap on the timer.
     */
    const handleLap = () => {
        
    }

    /**
     * Nicely formats the displaying time.
     * 
     * @param {number} num: the time to be formatted (in milliseconds)
     * @returns {string} a string with the formatted time.
     */
    const formatTime = (num: number): string => {
        const HOURS_TO_MILLISECONDS = 3600 * 1000;
        const MINUTES_TO_MILLISECONDS = 60 * 1000;

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

            <div className="stopwatch-button-grid">
                <StopWatchButton label={"Start"} onPress={handleStart}></StopWatchButton>
                <StopWatchButton label={"Stop"} onPress={handleStop}></StopWatchButton>
                <StopWatchButton label={"Reset"} onPress={handleReset}></StopWatchButton>
                <StopWatchButton label={"Lap"} onPress={handleLap}></StopWatchButton>
            </div>
        </div>
    )
}