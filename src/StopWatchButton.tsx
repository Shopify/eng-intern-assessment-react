import React, { useState } from "react";
import "../styles/StopWatchButtons.css";

interface StopWatchButtonProps {
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onLap: () => void;
  isRunning: () => boolean;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  onStart,
  onStop,
  onReset,
  onLap,
  isRunning,
}) => {
  let [runningState, setRunningState] = useState(true);

  const buttonStyleStartStop = {
    background: runningState ? "green" : "red",
  };

  const buttonStyleResetLap = {
    background: runningState ? "red" : "green",
  };

  return (
    <div>
      {runningState && (
        <button
          style={buttonStyleStartStop}
          onClick={() => {
            setRunningState(false);
            onStart();
          }}
        >
          Start
        </button>
      )}
      {!runningState && (
        <button
          style={buttonStyleStartStop}
          onClick={() => {
            setRunningState(true);
            onStop();
          }}
        >
          Stop
        </button>
      )}
      {runningState && (
        <button
          style={buttonStyleResetLap}
          onClick={() => {
            onReset();
          }}
        >
          Reset
        </button>
      )}
      {!runningState && (
        <button
          style={buttonStyleResetLap}
          onClick={() => {
            onLap();
          }}
        >
          Lap
        </button>
      )}
    </div>
  );
};

export default StopWatchButton;
