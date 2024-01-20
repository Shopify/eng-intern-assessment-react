import React from "react";
import "./StopWatchButton.css";

type StopWatchButtonProps = {
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onLap: () => void;
  startActive: boolean;
  stopActive: boolean;
};

export default function StopWatchButton({
  onStart,
  onStop,
  onReset,
  onLap,
  startActive,
  stopActive,
}: StopWatchButtonProps) {
  return (
    <div className="button-container">
      <div className="button-row">
        <button
          className={`start_button ${startActive ? "active" : ""}`}
          onClick={onStart}
        >
          Start
        </button>
        <button
          className={`stop_button ${stopActive ? "active" : ""}`}
          onClick={onStop}
        >
          Stop
        </button>
        <button className="reset_button" onClick={onReset}>
          Reset
        </button>
        <button className="lap_button" onClick={onLap}>
          Lap
        </button>
      </div>
    </div>
  );
}
