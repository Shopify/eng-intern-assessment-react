import React from 'react';
import { formatBigTime } from './utils/timeUtils'; // Utility for time formatting
import StopwatchButton from './StopWatchButton'; // Reusable button component
import useStopwatch from './hooks/useStopwatch'; // Custom hook for stopwatch logic
import backgroundImage from './shopify-logo-png-transparent.png'

/**
 * Stopwatch component displaying the current time and laps.
 * 
 * It uses the `useStopwatch` hook to control the stopwatch state and behavior,
 * including current time, running s.tatus, and recorded laps. The state is displayed
 * using formatted time. It also renders control buttons for starting, stopping,
 * recording laps, and resetting the stopwatch using the `StopwatchButton` component.
 */
const Stopwatch = () => {
    // Extracting state and control functions from the useStopwatch hook
    const { time, lapTime, isRunning, laps, milliseconds, start, stop, lap, reset } = useStopwatch();

    const containerClass = laps.length > 0 ? "stopwatch-container stopwatch-container--laps-added" : "stopwatch-container";

    const backgroundStyle: React.CSSProperties = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        opacity: 0.2, // Adjust for desired transparency
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1, // Ensure it's behind other content
    };

    return (
        <div className="stopwatch-page">
            <div style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                opacity: 0.1, // Transparency for the image
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1, // Behind the content
            }} />
            <div className="stopwatch-container">
                <div className="stopwatch-display">
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
                </div>


                {/* Buttons */}
            <div className="button-container">
                <button className="start-button" onClick={start} disabled={isRunning} >Start</button>
                <button className="stop-button" onClick={stop} disabled={!isRunning} >Stop</button>
                <button className="lap-button" onClick={lap} disabled={!isRunning}>Lap</button>
                <button className="reset-button" onClick={reset}>Reset</button>
                </div>
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
