import React from "react";

type Props = {
  isRunning: boolean;
  handleStart: () => void;
  handleStop: () => void;
  handleLap: () => void;
  handleReset: () => void;
};

export default function StopWatchButton(props: Props) {
  const { isRunning, handleStart, handleStop, handleLap, handleReset } = props;

  return (
    <div className="btn-container">
      {isRunning ? (
        <button className="btn stop-btn" onClick={handleStop}>
          Stop
        </button>
      ) : (
        <button className="btn start-btn" onClick={handleStart}>
          Start
        </button>
      )}
      <button className="btn lap-btn" onClick={handleLap} disabled={!isRunning}>
        Lap
      </button>
      <button className="btn reset-btn" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}
