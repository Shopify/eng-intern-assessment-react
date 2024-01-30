import React, { useCallback, useEffect, useState } from 'react'
import StopWatchButton from './StopWatchButton';

// Function to format the time in minutes, seconds, and milliseconds
export function formattedTime(time: number): string {
    // Calculate total hours, remaining minutes, seconds, and milliseconds
    const totalHours = Math.floor(time / 360000);
    const remainingMinutes = Math.floor((time % 360000) / 6000);
    const remainingSeconds = Math.floor((time % 6000) / 100);
    const remainingMilliseconds = time % 100;

    // Format individual components to ensure they have two digits
    const formattedMinutes = remainingMinutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
    const formattedMilliseconds = remainingMilliseconds.toString().padStart(2, '0');

    // Combine formatted components into a string representing the time
    return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  }
   
// StopWatch component
export default function StopWatch() {
    // State to track time, whether the timer is running, and lap times
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);

    // Callback function to handle resetting the stopwatch
    const handleReset = useCallback(() => {
        setIsRunning(false); 
        setTime(0); 
        setLaps([]);
      }, []);

    // Effect to update time every second when the timer is running
    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (isRunning) {
          intervalId = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
          }, 10);
        }
        // Clear the interval when the component unmounts or when the timer is stopped
        return () => clearInterval(intervalId);
    }, [isRunning]);

    return (
      <div className="stopwatch-container">
        <h1>StopWatch</h1>
        <div className="stopwatch-display">
          <p>{formattedTime(time)}</p>
        </div>
        <div className="button-container">
          <StopWatchButton type="start" onClick={() => setIsRunning(true)} disabled={isRunning} />
          <StopWatchButton type="stop" onClick={() => setIsRunning(false)} disabled={!isRunning} />
          <StopWatchButton type="lap" onClick={() => setLaps([...laps, time])} disabled={!isRunning} />
          <StopWatchButton type="reset" onClick={handleReset} />
        </div>
        {laps.length > 0 && (
          <div className="lap-times">
            <h2>Lap Times</h2>
            <ul>
              {laps.map((lap, index) => (
                <li key={index}>{formattedTime(lap)}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }