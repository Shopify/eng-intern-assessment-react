import React from "react";

import "./stopwatch.css";

export default function StopWatchButton({
  active,
  timerHandler,
  elapsedTimeHandler,
}: {
  active: boolean;
  timerHandler: React.Dispatch<React.SetStateAction<boolean>>;
  elapsedTimeHandler: React.Dispatch<React.SetStateAction<number>>;
}) {
  const resetHandler = () => {
    timerHandler(false);
    elapsedTimeHandler(0);
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
      <span className="stopwatch-button">Lapse</span>
      <span className="stopwatch-button stopwatch-red" onClick={resetHandler}>
        Reset
      </span>
    </div>
  );
}
