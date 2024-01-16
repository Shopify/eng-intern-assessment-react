import React from 'react';

// Define the properties expected by the StopWatchButton component
interface StopWatchButtonProps {
  onStart: () => void;  // Function to start the stopwatch
  onStop: () => void;   // Function to stop the stopwatch
  onReset: () => void;  // Function to reset the stopwatch
  onLap: () => void;    // Function to record a lap time
  isRunning: boolean;   // Indicates whether the stopwatch is currently running
}

// StopWatchButton component receives various event handler functions and isRunning status
const StopWatchButton: React.FC<StopWatchButtonProps> = ({ onStart, onStop, onReset, onLap, isRunning }) => {
  return (
    <div>
      {/* Button to start/stop the stopwatch */}
      <button onClick={isRunning ? onStop : onStart}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      
      {/* Button to record a lap time, disabled when the stopwatch is not running */}
      <button onClick={onLap} disabled={!isRunning}>
        Lap
      </button>
      
      {/* Button to reset the stopwatch */}
      <button onClick={onReset}>
        Reset
      </button>
    </div>
  );
};

// Export the StopWatchButton component for use in other parts of the application
export default StopWatchButton;
