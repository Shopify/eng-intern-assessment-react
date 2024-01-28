import React from "react";
import { useRef } from "react";

interface StopwatchButtonsProps {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  addNewLap: () => void;
  setLaps: React.Dispatch<React.SetStateAction<number[]>>;
  setSavedTime: React.Dispatch<React.SetStateAction<number>>;
}

export default function StopWatchButton({
  time,
  setTime,
  isPaused,
  setIsPaused,
  addNewLap,
  setLaps,
  setSavedTime
}: StopwatchButtonsProps) {

  const handlePause = (): void => {
    setIsPaused(!isPaused);
  };

  const resetTime = (): void => {
    setTime(0);
    setSavedTime(0);
    setIsPaused(true);
    setLaps([]);
  };

  
  return (
    <div>
      <button onClick={handlePause}>{isPaused ? "Start" : "Pause"}</button>
      <button onClick={resetTime}>Reset</button>
      <button onClick={addNewLap}>Lap</button>
    </div>
  );
}
