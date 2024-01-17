import React from 'react';
import './styles/StopWatchButton.css';

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
    <div className="stopwatch-buttons">
      <button className={`button ${isActive ? 'stop' : 'start'}`} onClick={onStartStop}>
        {isActive ? 'Stop' : 'Start'}
      </button>
      <button className={`button ${isActive ? 'lap' : 'reset'}`} onClick={isActive ? onLap : onReset}>
        {isActive ? 'Lap' : 'Reset'}
      </button>
    </div>
    
  );
};

export default StopwatchButton;
