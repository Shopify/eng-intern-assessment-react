import React from "react";

import "./stopwatch.css";

interface StopWatchButtonProps {
  timer: boolean;
  timerHandler: React.Dispatch<React.SetStateAction<boolean>>;
  elapsedTime: number;
  elapsedTimeHandler: React.Dispatch<React.SetStateAction<number>>;
  laps: number[];
  lapsHandler: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function StopWatchButton({
  timer,
  timerHandler,
  elapsedTime,
  elapsedTimeHandler,
  laps,
  lapsHandler,
}: StopWatchButtonProps) {
  const resetHandler = () => {
    timerHandler(false);
    elapsedTimeHandler(0);
    lapsHandler([]);
  };

  return (
    <div className="stopwatch-button-box">
      {/* Creating the buttons as <span> elements instead of <button> to override the default UI */}
      {timer ? (
        <span
          onClick={() => timerHandler(!timer)}
          className="stopwatch-button stopwatch-red"
        >
          Stop
        </span>
      ) : (
        <span onClick={() => timerHandler(!timer)} className="stopwatch-button">
          Start
        </span>
      )}
      <span
        className="stopwatch-button"
        onClick={() => lapsHandler([...laps, elapsedTime])}
      >
        Lap
      </span>
      <span className="stopwatch-button stopwatch-red" onClick={resetHandler}>
        Reset
      </span>
    </div>
  );
}
