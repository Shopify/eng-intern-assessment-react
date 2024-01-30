import React from "react";
import "./StopWatchButton.css";

interface StopwatchButtonProps {
  start: () => void;
  stop: () => void;
  reset: () => void;
  lap: () => void;
  counting: boolean;
}

const StopWatchButton: React.FC<StopwatchButtonProps> = ({
  start,
  stop,
  reset,
  lap,
  counting,
}) => {
  return (
    <div>
      {!counting && (
        <button onClick={start} className="startAndStop">
          Start
        </button>
      )}
      {counting && <button onClick={stop}>Stop</button>}
      <button onClick={lap} className="lap">
        Lap
      </button>
      <button onClick={reset} className="reset">
        Reset
      </button>
    </div>
  );
};
export default StopWatchButton;
