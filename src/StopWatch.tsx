import React, { useState } from "react";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  const [totalTime, setTotalTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [intervalID, setIntervalId] = useState<NodeJS.Timer | null>(null);
  const [laps, setLaps] = useState<string[]>([]);

  //increment setInterval by 10ms
  const timeInterval = 10;

  const handleStartStop = () => {
    setIsRunning(!isRunning);
    const clickStartTime = Date.now();
    if (!isRunning) {
      const startIntervalID = setInterval(() => {
        //Use Date Object for more accurate handling of
        const timeStamp = Date.now();
        const elapsedTime = timeStamp - clickStartTime;
        setTotalTime(totalTime + elapsedTime);
      }, timeInterval);
      setIntervalId(startIntervalID);
    } else {
      clearInterval(intervalID);
    }
  };

  const formatTime = (timeUnit: number): string => {
    return timeUnit.toString().padStart(2, "0").slice(0, 2);
  };

  //Numerical Conversions of total time
  const milliSeconds = totalTime % 1000;
  const seconds = Math.floor((totalTime / 1000) % 60);
  const minutes = Math.floor((totalTime / (1000 * 60)) % 60);
  const hours = Math.floor((totalTime / (1000 * 60 * 60)) % 60);

  const displayTime = `${formatTime(minutes)}:${formatTime(
    seconds
  )}:${formatTime(milliSeconds)}`;

  const handleReset = () => {
    setTotalTime(0);
    clearInterval(intervalID);
    setIsRunning(false);
  };

  const handleLaps = () => {
    setLaps([...laps, displayTime]);
  };

  const handleClearLaps = () => {
    setLaps([]);
  };
  return (
    <div className="stopwatch-app">
      <div className="stopwatch container">
        <StopWatchButton
          title={isRunning ? "Stop" : "Start"}
          handleClick={handleStartStop}
        />
        <StopWatchButton title={"Reset"} handleClick={handleReset} />
        <StopWatchButton title={"Lap"} handleClick={handleLaps} />
        <div className="clock-container">
          <div data-testid="displayed-time">{displayTime}</div>
        </div>
      </div>
      <div className="lap container">
        <StopWatchButton title={"Clear Lap"} handleClick={handleClearLaps} />
        <ul>
          {laps.map((lap, index) => (
            <li data-testid={`list-item-${index}`} key={index}>
              {lap}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
