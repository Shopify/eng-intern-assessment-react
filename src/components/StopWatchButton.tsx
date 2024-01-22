import React from 'react';
import '../styles/StopWatchButton.css';

// Interface for the stopwatch control buttons
interface StopWatchButtonProps {
  isRunning: boolean;  // Indicates if the stopwatch is running
  isPaused: boolean;   // Indicates if the stopwatch is paused
  start: () => void;   // Function to start or resume the timer
  pause: () => void;   // Function to pause the timer
  reset: () => void;   // Function to reset the timer
  lap: () => void;     // Function to record a lap
  startTime: number | null;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  isRunning,
  isPaused,
  start,
  pause,
  reset,
  lap,
}) => {
  return (
    <div>
      {/* When the timer is not running and not paused, show "Start" and a disabled "Lap" button */}
      {!isRunning && !isPaused && (
        <>
          <button className="stopwatch-button" onClick={start}>Start</button>
          <button className="stopwatch-button" disabled>Lap</button>
        </>
      )}

      {/* When the timer is running, show "Pause" and "Lap" */}
      {isRunning && (
        <>
          <button className="stopwatch-button" onClick={pause}>Pause</button>
          <button className="stopwatch-button" onClick={lap}>Lap</button>
        </>
      )}

      {/* When the timer is paused, show "Resume" and "Reset" */}
      {isPaused && (
        <>
          <button className="stopwatch-button" onClick={start}>Resume</button>
          <button className="stopwatch-button" onClick={reset}>Reset</button>
        </>
      )}
    </div>
  );
};

export default StopWatchButton;
