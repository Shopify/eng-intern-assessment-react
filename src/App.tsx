

import React, { useState, useRef } from 'react';
import Stopwatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import "./App.css";

export default function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const [runningTime, setRunningTime] = useState<number>(0);
  const [lastTime, setLastTime] = useState<number>(0);
  const stopwatchRef = useRef<number | null>(null);

  const startStopwatch = () => {
    if (!isRunning) {
      stopwatchRef.current = window.setInterval(() => {
        setRunningTime((prevTime) => prevTime + 1000);
      }, 1000);
    } else {
      window.clearInterval(stopwatchRef.current);
    }
    setIsRunning(!isRunning);
  };

  const resetStopwatch = () => {
    window.clearInterval(stopwatchRef.current);
    setLaps([]);
    setIsRunning(false);
    setRunningTime(0);
    setLastTime(0);
  };

  const recordLap = () => {
    if (isRunning) {
      const currentTime = runningTime;
      const lapDifference = currentTime - lastTime;
      setLastTime(currentTime);
      setLaps((prevLaps) => [lapDifference, ...prevLaps]);
    }
  };


  return (
    <div className="container">
        <div className="stopwatch">
            <StopWatchButton
            isRunning={isRunning}
            onStartStopClick={startStopwatch}
            onResetLapClick={isRunning ? recordLap : resetStopwatch}
            />  
            <Stopwatch isRunning={isRunning} laps={laps} runningTime={runningTime} />
        </div>
    </div>
  );
}

