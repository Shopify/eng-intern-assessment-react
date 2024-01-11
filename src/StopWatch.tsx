import React, { useState, useEffect, useRef } from "react";
import StopWatchButton from "./StopWatchButton";
import "./styles/styles.css";

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
    <div className="container">
      <div className="timer">Time: {time}s</div>
      <div className="buttonContainer">
        <StopWatchButton onClick={startStopHandler} label={isRunning ? 'Stop' : 'Start'} />
        <StopWatchButton onClick={resetHandler} label="Reset" />
        <StopWatchButton onClick={lapHandler} label="Lap" />
      </div>
        {lapTimes.current.map((lapTime, index) => (
          <div key={index} className="lapItem">Lap {index + 1}: {lapTime}s</div>
        ))}
    </div>
  );
}

export default StopWatch;
