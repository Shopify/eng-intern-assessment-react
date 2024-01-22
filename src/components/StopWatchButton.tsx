import React from 'react';

//control buttons
interface StopWatchButtonProps {
  isRunning: boolean;  // Indicates if the stopwatch is running
  start: () => void;  // Function to start the timer
  stop: () => void;  // Function to stop the timer
  reset: () => void;  // Function to reset the timer
  lap: () => void;  // Function to record a lap
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  isRunning,
  start,
  stop,
  reset,
  lap,
}) => {
  return (
    <div>
      {/* Render the "Start" button only if the stopwatch is not running */}
      {!isRunning && <button onClick={start}>Start</button>}

      {/* Render the "Stop" button only if the stopwatch is running */}
      {isRunning && <button onClick={stop}>Stop</button>}

      {/* The "Reset" button is always rendered and can be clicked at any time */}
      <button onClick={reset}>Reset</button>

      {/* Render the "Lap" button only if the stopwatch is running */}
      {isRunning && <button onClick={lap}>Lap</button>}
    </div>
  );
};

export default StopWatchButton;
