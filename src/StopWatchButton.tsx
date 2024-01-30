import React from 'react';
import "./StopWatch.css";

interface StopWatchButtons {
  onStart: () => void;
  onStop: () => void;
  onLap: () => void;
  onReset: () => void;
  isRunning: boolean;
}

// Separate button display based off of functions from StopWatch
const StopWatchButton: React.FC<StopWatchButtons> = ({ onStart, onStop, onLap, onReset, isRunning }) => {
  return (
    <div className="stopwatch-buttons">
      <button className="stopwatch-button" onClick={onStart} disabled={isRunning} style={{ cursor: isRunning ? "not-allowed" : "pointer" }}>Start</button>
      <button className="stopwatch-button" onClick={onStop}>Stop</button>
      <button className="stopwatch-button" onClick={onLap}>Lap</button>
      <button className="stopwatch-button" onClick={onReset}>Reset</button>
    </div>
  );
};

// For use in StopWatch
export default StopWatchButton;