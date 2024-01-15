import React from "react";

import "./stopwatch.css";

export default function StopWatchButton({
  active,
  timerHandler,
  elapsedTime,
  elapsedTimeHandler,
  elapsedTimes,
  updateLapsedTimeHandler,
}: {
  active: boolean;
  timerHandler: React.Dispatch<React.SetStateAction<boolean>>;
  elapsedTime: number;
  elapsedTimeHandler: React.Dispatch<React.SetStateAction<number>>;
  elapsedTimes: number[];
  updateLapsedTimeHandler: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const resetHandler = () => {
    timerHandler(false);
    elapsedTimeHandler(0);
    updateLapsedTimeHandler([]);
  };

  return (
    <div className="stopwatch-button-box">
      {/* Creating the buttons as <span> elements instead of <button> to override the default UI */}
      {active ? (
        <span
          onClick={() => timerHandler(!active)}
          className="stopwatch-button stopwatch-red"
        >
          Stop
        </span>
      ) : (
        <span
          onClick={() => timerHandler(!active)}
          className="stopwatch-button"
        >
          Start
        </span>
      )}
      <span
        className="stopwatch-button"
        onClick={() => updateLapsedTimeHandler([...elapsedTimes, elapsedTime])}
      >
        Lap
      </span>
      <span className="stopwatch-button stopwatch-red" onClick={resetHandler}>
        Reset
      </span>
    </div>
  );
}
