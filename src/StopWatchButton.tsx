import React from "react";

interface StopwatchButtonProps {
  isRunning: boolean;
  startStop: () => void;
  reset: () => void;
  recordLap: () => void;
}

const StopwatchButton: React.FC<StopwatchButtonProps> = ({
  isRunning,
  startStop,
  reset,
  recordLap,
}) => {
  return (
    <div>
      <button onClick={() => startStop()}>
        {isRunning ? "Stop" : "Start"}
      </button>
      <button onClick={() => reset()}>Reset</button>
      <button onClick={() => recordLap()} disabled={!isRunning}>
        Lap
      </button>
    </div>
  );
};

export default StopwatchButton;
