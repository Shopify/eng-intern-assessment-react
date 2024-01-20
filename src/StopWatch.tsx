import React from 'react';
import { formatBigTime } from './utils/timeUtils'; // Utility for time formatting
import StopwatchButton from './StopWatchButton'; // Reusable button component
import useStopwatch from './hooks/useStopwatch'; // Custom hook for stopwatch logic

/**
 * Stopwatch component displaying the current time and laps.
 * 
 * It uses the `useStopwatch` hook to control the stopwatch state and behavior,
 * including current time, running status, and recorded laps. The state is displayed
 * using formatted time. It also renders control buttons for starting, stopping,
 * recording laps, and resetting the stopwatch using the `StopwatchButton` component.
 */
const Stopwatch = () => {
    // Extracting state and control functions from the useStopwatch hook
    const { time, lapTime, isRunning, laps, milliseconds, start, stop, lap, reset } = useStopwatch();

    const containerClass = laps.length > 0 ? "stopwatch-container stopwatch-container--laps-added" : "stopwatch-container";

    return (
        <div className="stopwatch-container">
            {/* Main Timer and Milliseconds */}
            <div className="timer-display">
                <h1>{formatBigTime(time)}s <span className="milliseconds-display">{milliseconds}</span></h1>
            </div>

            {/* Lap Timer */}
            {laps.length > 0 && (
                <div className="lap-time-display">
                    <h2>{formatBigTime(lapTime)}</h2>
                </div>
            )}

            {/* Buttons */}
            <div className="button-container">
                <StopwatchButton action={start} disabled={isRunning} label="Start" />
                <StopwatchButton action={stop} label="Stop" />
                <StopwatchButton action={lap} disabled={!isRunning} label="Lap" />
                <StopwatchButton action={reset} label="Reset" />
            </div>

            {/* Laps List */}
            {laps.length > 0 && (
                <div className="laps-container">
                    <ul>
                        {laps.map((lapTime, index) => (
                            <li key={index}>Lap {index + 1}: {formatBigTime(lapTime)}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Stopwatch;
