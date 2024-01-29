import React, { useState } from "react";
import { displayTime } from "./utils";

interface StopWatchButtonProps {
  isCounting: boolean;
  currentLap: number;
  setIsCounting: (isCounting: any) => void;
  setTime: (milliseconds: any) => void;
  setLaps: (lapTime: any) => void;
  setHasStartedStopwatch: (hasStartedStopwatch: any) => void;
  setCurrentLap: (oldLap: any) => void;
}

export default function StopWatchButton({
  isCounting,
  currentLap,
  setIsCounting,
  setTime,
  setLaps,
  setHasStartedStopwatch,
  setCurrentLap,
}: StopWatchButtonProps) {
  const [timer, setTimer] = useState(null);
  const resetTimer = () => {
    setTime(0);
    setLaps((oldLaps: any): any[] => []);
    setHasStartedStopwatch(false);
  };

  const stopTimer = () => {
    clearInterval(timer);
    setTimer(null);
    setIsCounting(false);
  };

  const addLap = () => {
    setLaps((oldLaps: any) => [...oldLaps, displayTime(currentLap)]);
    setCurrentLap(0);
  };

  const startTimer = () => {
    setIsCounting(true);
    setHasStartedStopwatch(true);
    const timer = setInterval(updateTime, 10);
    setTimer(timer);
  };

  const updateTime = () => {
    setTime((oldTime: number) => oldTime + 10);
    setCurrentLap((oldLap: number) => oldLap + 10);
  };
  return (
    <div>
      {isCounting ? (
        <button onClick={stopTimer}>Stop</button>
      ) : (
        <button onClick={startTimer}>Start</button>
      )}
      {isCounting ? (
        <button onClick={addLap}>Lap</button>
      ) : (
        <button onClick={resetTimer}>Reset</button>
      )}
    </div>
  );
}
