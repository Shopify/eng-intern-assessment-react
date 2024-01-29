import React from "react";
import { useEffect, useState } from "react";

interface StopWatchButtonProps {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  setLaps: React.Dispatch<React.SetStateAction<number[]>>;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  setToggle,
  setTimer,
  setLaps,
  timer,
}) => {
  const handleReset = () => {
    setToggle(false);
    setTimer(0);
    setLaps([]);
  };
  return (
    <div>
      <button onClick={() => setToggle(true)}>Start</button>
      <button onClick={() => setToggle(false)}>Stop</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={() => setLaps((prevLaps) => [...prevLaps, timer])}>
        Lap
      </button>
    </div>
  );
};

export default StopWatchButton;
