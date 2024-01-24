// StopWatchButton.tsx

import React from 'react';
import './StopWatchButton.css'; // Import the CSS file

interface StopWatchButtonProps {
  isRunning: boolean;
  onStartStopClick: () => void;
  onResetLapClick: () => void;
}

export default function StopWatchButton({
  isRunning,
  onStartStopClick,
  onResetLapClick,
}: StopWatchButtonProps) {
  return (
    <div className="button-container"> 
      <button className={isRunning ? 'stop-button' : 'start-button'} onClick={onStartStopClick}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button className={isRunning ? 'lap-button' : 'reset-button'} onClick={onResetLapClick}>
        {isRunning ? 'Lap' : 'Reset'}
      </button>
    </div>
  );
}
