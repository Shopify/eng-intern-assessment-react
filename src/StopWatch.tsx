import React, { useEffect, useState } from 'react';
import './StopWatch.css';
import StopwatchButton from './StopWatchButton';

/**
 * @typedef {Object} Lap 
 * @property {number} minutes - minutes part of a lap
 * @property {number} seconds - seconds part of a lap
 * @property {number} milliseconds- seconds part of a lap
 */
interface Lap {
    minutes: number;
    seconds: number;
    milliseconds: number;
}

/**
 * Component that represents the Stopwatch display.
 * @function Stopwatch
 * @returns {JSX.Element} the rendered stopwatch component. 
 */
export default function StopWatch(): JSX.Element {
    // State variables to manage stopwatch functionality
    const [isActive, setIsActive] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [laps, setLaps] = useState<Lap[]>([]);

    /**
     * Use an effect to start & stop timer based on the "isActive" state.
     * @function useEffect
     */
    useEffect(() => {
        let timerId: NodeJS.Timeout;

        if (isActive) {
            // Start a timer that updates the currentTime every 10 milliseconds
            timerId = setInterval(() => {
                setCurrentTime((prevTime) => prevTime + 10);
            }, 10);
        } else {
            // Clear the timer when "isActive" becomes false
            clearInterval(timerId);
        }
        // Clear timer when component unmounts or when "isActive" changes
        return () => clearInterval(timerId);
    }, [isActive]);

    // Calculation for minutes, seconds and milliseconds 
    const minutes = Math.floor(currentTime / 60000);
    const seconds = Math.floor((currentTime % 60000) / 1000);
    const milliseconds = currentTime % 1000;

    // Format of values for consistent display
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedMilliseconds = String(milliseconds).substring(0, 2).padStart(2, '0');

    /**
     * Record a lap by adding the current lap time to the lap state. 
     * @function recordLap
     */
    const recordLap = () => {
        const lapTime: Lap = {
            minutes,
            seconds,
            milliseconds,
        };
        setLaps([...laps, lapTime]);
    };

    /**
     * Handles the reset button functionality.
     * Resets the stopwatch & clears the recorded laps.
     * @function handleReset
     */
    const handleReset = () => {
        setIsActive(false);
        setCurrentTime(0);
        setLaps([]);
    };

    return (
        <div className="stopwatch-background">
            <div className="stopwatch-container">
                <p className="stopwatch-text" data-testid="stopwatch-display">{`${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`}</p>

            </div>
            
            {/* StopwatchButton */}
            <StopwatchButton
                onStart={() => setIsActive(true)}
                onStop={() => setIsActive(false)}
                onReset={() => handleReset()}
                onLap={recordLap}
                isActive={isActive}
            />

            <div className="lap-container" data-testid="lap-list">
                {laps.slice(0).reverse().map((lap, index) => (
                    <div key={index}>
                        <hr />
                        <p className="lap-text">
                            lap {laps.length - index}:&nbsp;
                            <span className="lap-time">
                                {String(lap.minutes).padStart(2, '0')}:
                                {String(lap.seconds).padStart(2, '0')}:
                                {String(lap.milliseconds).substring(0, 2).padStart(2, '0')}
                            </span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
