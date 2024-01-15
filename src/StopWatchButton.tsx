import React from "react";

import "./stopwatch.css";

export default function StopWatchButton({
  active,
  timerHandler,
}: {
  active: boolean;
  timerHandler: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
      <span className="stopwatch-button stopwatch-red">Reset</span>
    </div>
  );
}
