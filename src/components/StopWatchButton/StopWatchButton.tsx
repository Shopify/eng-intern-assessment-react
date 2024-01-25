import React, { useState } from "react";
import "./StopWatchButton.css";

type StopWatchButtonProps = {
  handleStart: () => void;
  handleStop: () => void;
  handleReset: () => void;
  handleLap: () => void;
  isStopWatchActive: boolean;
};

type StopWatchAction = "start" | "stop";

export function StopWatchButton({
  isStopWatchActive = false,
  handleStart,
  handleStop,
  handleReset,
  handleLap,
}: StopWatchButtonProps) {
  const [action, setAction] = useState<StopWatchAction>("start");

  const onStart = () => {
    handleStart();
    setAction("stop");
  };

  const onStop = () => {
    handleStop();
    setAction("start");
  };

  const onReset = () => {
    handleReset();
    setAction("start");
  };
  return (
    <section className="btn-container">
      <button
        className="btn lapBtn"
        disabled={!isStopWatchActive}
        onClick={handleLap}
      >
        Lap
      </button>
      {action == "start" ? (
        <button
          className="btn startBtn"
          disabled={isStopWatchActive}
          onClick={onStart}
        >
          Start
        </button>
      ) : (
        <button
          className="btn stopBtn"
          disabled={!isStopWatchActive}
          onClick={onStop}
        >
          Stop
        </button>
      )}
      <button className="btn resetBtn" onClick={onReset}>
        Reset
      </button>
    </section>
  );
}
