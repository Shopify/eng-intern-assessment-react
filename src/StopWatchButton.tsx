import React, { useState } from "react";
import "../styles/StopWatchButtons.css";

// Define the props for the StopWatchButton component
interface StopWatchButtonProps {
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onLap: () => void;
  isRunning: () => boolean;
}

// StopWatchButton component using functional component syntax
const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  onStart,
  onStop,
  onReset,
  onLap,
  isRunning,
}) => {
  // State to manage the running state of the button
  let [runningState, setRunningState] = useState(true);

  // Styles for Start/Stop button based on running state
  const buttonStyleStartStop = {
    background: runningState ? "green" : "red",
  };

  // Styles for Reset/Lap button based on running state
  const buttonStyleResetLap = {
    background: runningState ? "red" : "green",
  };

  // Render the StopWatchButton component
  return (
    <div>
      {/* Start button when the stopwatch is not running */}
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

      {/* Stop button when the stopwatch is running */}
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

      {/* Reset button when the stopwatch is running */}
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

      {/* Lap button when the stopwatch is not running */}
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

// Export the StopWatchButton component as the default export
export default StopWatchButton;
