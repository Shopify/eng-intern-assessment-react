import React, { useRef, useState } from 'react';
import StopWatchButton from './StopWatchButton';
import { formatTime } from './util';

/**
 * StopWatch component with start/stop, lap, and reset buttons
 */
export default function StopWatch() {

    // Stores the number of elapsed milliseconds (i.e. stopwatch time)
    const [elapsedMilli, setElapsedMilli] = useState<number>(0);
    // Indicates whether the stopwatch is running or not
    const [isRunning, setIsRunning] = useState<boolean>(false);
    // A list of lap times accumulated so far
    const [lapTimes, setLapTimes] = useState<number[]>([]);

    // Ref for the start time of the stopwatch (used to calculated the elapsed time)
    const startTimeRef = useRef<number>(null);

    // Ref for the stopwatch interval timer
    const stopwatchRef = useRef<NodeJS.Timer>();

    /**
     * Handles the start or stop actions of the stopwatch
     */
    const startStopTimer = () => {
        if (isRunning) {
            stopTimer();
        } else {
            // Offsets the start time so we can account for the elapsed milliseconds 
            // that otherwise would've been lost when the start date was reset
            startTimeRef.current = Date.now() - elapsedMilli;

            // Sets an interval to update the elapsed time every 10 milliseconds
            stopwatchRef.current = setInterval(() => {
                setElapsedMilli(Date.now() - startTimeRef.current);
            }, 10);
        }

        setIsRunning(!isRunning);
    };

    /**
     * Pauses the stopwatch by clearing the interval that updates the elapased time
     */
    const stopTimer = () => {
        clearInterval(stopwatchRef.current);
    }

    /**
     * Resets the stopwatch by stopping the timer and resetting the elapsed time 
     * and lap times.
     */
    const reset = () => {
        stopTimer();
        setIsRunning(false);
        setElapsedMilli(0);
        setLapTimes([]);
    };

    /**
     * Handles the lap time action by adding the latest lap time to the 
     * existing lap time list
     */
    const recordLap = () => {
        // The lap time can be computed by taking the difference between the 
        // elapsed time and the sum of the accumulated lap times so far.
        const lapTime = elapsedMilli - lapTimes.reduce((a, b) => a + b, 0);
        setLapTimes([...lapTimes, lapTime]);
    };

    return (
        <div className="stopwatch-container">
            <div className="stopwatch-time-container">
                <p className="stopwatch-time">
                    {formatTime(elapsedMilli)}
                </p>
            </div>
            <div className="stopwatch-buttons">
                <StopWatchButton onClick={startStopTimer} text={isRunning ? "Stop" : "Start"} />
                <StopWatchButton onClick={recordLap} text="Lap" disabled={!isRunning} />
                <StopWatchButton onClick={reset} text="Reset" />
            </div>
            <div>
                <p className='lap-times-title'>Lap Times</p>
                <ul className='lap-times-list'>
                    {lapTimes.map((lapTime: number, index: number) => (
                        <li key={index}>
                            Lap {index + 1}: {formatTime(lapTime)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
