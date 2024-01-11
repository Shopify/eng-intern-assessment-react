import React, { useState, useEffect, useRef } from "react";
import StopWatchButton from "./StopWatchButton";

const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const lapTimes = useRef<number[]>([]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const startStopHandler = () => {
    setIsRunning(!isRunning);
  };

  const resetHandler = () => {
    setTime(0);
    setIsRunning(false);
    lapTimes.current = [];
  };

  const lapHandler = () => {
    lapTimes.current.push(time);
  };

  return (
    <div>
      <div>Time: {time}s</div>
      <StopWatchButton onClick={startStopHandler} label={isRunning ? 'Stop' : 'Start'} />
      <StopWatchButton onClick={resetHandler} label="Reset" />
      <StopWatchButton onClick={lapHandler} label="Lap" />
      <ul>
        {lapTimes.current.map((lapTime, index) => (
          <li key={index}>Lap {index + 1}: {lapTime}s</li>
        ))}
      </ul>
    </div>
  );
}

export default StopWatch;