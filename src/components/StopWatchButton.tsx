import React from 'react';
import '../styles/StopWatchButton.css';

// Props interface for the StopwatchButton component
interface StopwatchButtonProps {
  isActive: boolean;
  onStartStop: () => void;
  onReset: () => void;
  onLap: () => void;
  onClearLaps: () => void;
}

const StopwatchButton: React.FC<StopwatchButtonProps> = ({
  isActive,
  onStartStop,
  onReset,
  onLap,
}) => {
  return (
    // Container for stopwatch control buttons
    <div className="stopwatch-buttons">
      {/* Button to start or stop the stopwatch--Ternary operator to switch between these buttons depends on onClick*/}
      <button className={`button ${isActive ? 'stop' : 'start'}`} onClick={onStartStop}>
        {isActive ? 'Stop' : 'Start'}
      </button>
      {/* Button to record a lap or reset the stopwatch--Ternary operator to switch between these buttons depends on onClick */}
      <button className={`button ${isActive ? 'lap' : 'reset'}`} onClick={isActive ? onLap : onReset}>
        {isActive ? 'Lap' : 'Reset'}
      </button>
    </div>
  );
};

export default StopwatchButton;
