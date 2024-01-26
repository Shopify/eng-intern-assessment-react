import React, { useState } from "react";

interface StopWatchButtonProps {
  time: number;
  isCounting: boolean;
  setIsCounting: (isCounting: any) => void;
  setTime: (milliseconds: any) => void;
}

export default function StopWatchButton({
  time,
  isCounting,
  setIsCounting,
  setTime,
}: StopWatchButtonProps) {
  const [timer, setTimer] = useState(null);
  const resetTimer = () => {
    setTime(0);
  };

  const stopTimer = () => {
    console.log("Stop Timer");
    clearInterval(timer);
    setTimer(null);
    setIsCounting(false);
  };

  const addLap = () => {
    console.log("Add Lap");
    console.log(time);
  };

  const startTimer = () => {
    console.log("Start Timer");
    setIsCounting(true);
    const timer = setInterval(updateTime, 10);
    setTimer(timer);
  };

  const updateTime = () => {
    setTime((oldTime: number) => oldTime + 10);
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
