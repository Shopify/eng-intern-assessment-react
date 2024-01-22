import React from 'react';

// StopWatchButton components
interface StopWatchButtonProps {
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

// Renders buttons
const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  isRunning,
  start,
  stop,
  reset,
}) => {
  return (
    <div>
      {/* "Start" button shown when stopwatch isn't running */}
      {!isRunning && <button onClick={start}>Start</button>}
      
      {/* "Stop" button shown when stopwatch is running */}
      {isRunning && <button onClick={stop}>Stop</button>}
      
      {/* "Reset" button, always displayed */}
      <button onClick={reset}>Reset</button>
    </div>
  );
};


export default StopWatchButton;
