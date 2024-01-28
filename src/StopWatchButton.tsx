import React from 'react';
import './App.css';

interface StopWatchButtonProps {
  isRunning: boolean;
  onStartStopClick: () => void;
  onLapClick: () => void;
  onResetClick: () => void;
}

export default function StopWatchButton({
  isRunning,
  onStartStopClick,
  onLapClick,
  onResetClick,
}: StopWatchButtonProps) {
  return (
    <div className="stopwatch-buttons">
      <button className={`stopwatch-button ${isRunning ? 'stop' : 'start'}`} onClick={onStartStopClick} data-testid="start-stop-button">
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button className="stopwatch-button lap" onClick={onLapClick} data-testid="lap-button">
        Lap
      </button>
      <button className="stopwatch-button reset" onClick={onResetClick} data-testid="reset-button">
        Reset
      </button>
    </div>
  );
}
