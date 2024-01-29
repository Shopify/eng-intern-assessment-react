import React, { useState, useRef, useEffect } from 'react';
import StopWatch from './StopWatch';

export default function App() {
  const [isRunning, setIsRunning] = useState(false); // State to control the timer status (running or stopped)
  const [elapsedTime, setElapsedTime] = useState(0); // Tracks elapsed time in seconds
  const [laps, setLaps] = useState<number[]>([]); // Stores lap times in milliseconds
  const intervalRef = useRef<number | null>(null); // Stores the interval ID

  useEffect(() => {
    if (isRunning) {
      // Start the timer when isRunning becomes true, create an interval
      intervalRef.current = window.setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1); // Increment by 1 millisecond
      }, 1); // Set interval to 1 millisecond
    } else {
      // Clear the interval when isRunning becomes false
      window.clearInterval(intervalRef.current!);
    }

    // Clears interval when dependencies change
    return () => {
      window.clearInterval(intervalRef.current!);
    };
  }, [isRunning, elapsedTime]); // UseEffect hook runs when isRunning or elapsedTime changes

  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  // Record a lap time
  const handleLap = () => {
    setLaps((prevLaps) => [...prevLaps, elapsedTime]);
  };

  // Resets stopwatch to initial state
  const handleReset = () => {
    window.clearInterval(intervalRef.current!);
    setIsRunning(false); // Stops the stopwatch
    setElapsedTime(0); // Reset elapsed time
    setLaps([]); // Clear lap times
  };

  // Renders the stopwatch component with relevant props`
  return (
    <div className="stopwatch-container">
      <StopWatch
        time={elapsedTime} // Display time in milliseconds
        laps={laps}
        isRunning={isRunning}
        onStartStop={handleStartStop}
        onLap={handleLap}
        onReset={handleReset}
      />
    </div>
  );
}
