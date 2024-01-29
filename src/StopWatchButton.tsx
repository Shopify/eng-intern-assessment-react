import React from 'react';
import './StopWatchButton.css';

// Components for StopWatch Button 
interface StopWatchButton {
  isRunning: boolean;
  onStartStop: () => void;
  onLap: () => void;
  onReset: () => void;
}


// Container for the Stopwatch buttons 
const StopWatchButton: React.FC<StopWatchButton> = ({
    isRunning,
    onStartStop,
    onLap,
    onReset,
  }) => (
    <div className="button-container">
      <button
        className={`button ${isRunning ? 'stop-button' : ''}`}
        onClick={onStartStop}
      >
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button className="lap-button" onClick={onLap}>
        Lap
      </button>
      <button className="reset-button" onClick={onReset}>
        Reset
      </button>
    </div>
  );


export default StopWatchButton;
