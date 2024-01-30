import React, { useState, useEffect, useCallback } from 'react'
import StopWatchButton from './StopWatchButton'

export default function StopWatch() {

    const [laps, setLaps] = useState<string[]>([]);
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    // Format number of milliseconds into a string representing the time in the format "MM:SS.sss"
    const formatTime = (milliseconds: number): string => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const millisecondsPart = (milliseconds % 1000).toString().padStart(3, '0');

        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${millisecondsPart}s`;
    };

    // Start the stopwatch
    const startStopwatch = useCallback(() => {
        setIsRunning(true);
    }, []);

    // Stop the stopwatch
    const stopStopwatch = useCallback(() => {
        setIsRunning(false);
    }, []);

    // Reset the stopwatch
    const resetStopwatch = useCallback(() => {
        setTime(0);
        setLaps([]);
        setIsRunning(false);
    }, []);

    // Add a lap to the list of laps
    const addLap = useCallback(() => {
        setLaps((prevLaps) => [...prevLaps, formatTime(time)]);
    }, [time]);

    // Watch for changes on isRunning and update the stopwatch time
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        // If the stopwatch is running, increment the time by 10 milliseconds
        if (isRunning) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        }

        // If the stopwatch is not running, stop the timer
        return () => clearInterval(timer);
    }, [isRunning]);

    return (
        <div className='stopwatch'>
            <h2 data-testid="time">{formatTime(time)}</h2>
            <div className='stopwatch-buttons'>
                <StopWatchButton label='Start' onClick={startStopwatch} />
                <StopWatchButton label='Stop' onClick={stopStopwatch} />
                <StopWatchButton label='Reset' onClick={resetStopwatch} />
                <StopWatchButton label='Lap' onClick={addLap} />
            </div>
            <span v-if='laps.length > 0' className='stopwatch-laps' data-testid="laps">
                {laps.map((lap, index) => (
                    <span className='stopwatch-lap' key={index}>Lap {index + 1}
                        <span>{lap}</span>
                    </span>
                ))}
            </span>
        </div>
    )
}