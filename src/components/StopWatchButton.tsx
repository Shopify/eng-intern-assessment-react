import React from 'react';

// StopWatchButton component for buttons controlls
interface StopWatchButtonProps {
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
  lap: () => void;
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
      {/* "Start" button shown when stopwatch isn't running */}
      {!isRunning && <button onClick={start}>Start</button>}
      
      {/* "Stop" button shown when stopwatch is running */}
      {isRunning && <button onClick={stop}>Stop</button>}
      
      {/* "Reset" button, always displayed */}
      <button onClick={reset}>Reset</button>

      {/* "Lap" button shown when stopwatch is running */}
      {isRunning && <button onClick={lap}>Lap</button>}
    </div>
  );
};

export default StopWatchButton;
