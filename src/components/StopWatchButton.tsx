// StopWatchButton.tsx
import React from 'react';

interface StopWatchButtonProps {
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  isRunning: boolean;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  onStart,
  onStop,
  onReset,
  isRunning,
}) => {
    
  return (
    <div>
      <button className='btn' onClick={onStart} disabled={isRunning}>
        Start
      </button>
      <button className='btn' onClick={onStop} disabled={!isRunning}>
        Stop
      </button>
      <button className='btn' onClick={onReset}>
        Reset
      </button>
    </div>
  );
};

export default StopWatchButton;
