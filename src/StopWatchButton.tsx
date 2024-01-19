
import React from 'react';

interface StopWatchButtonProps {
  onStart: () => void;
  onStop: () => void;
  onClear: () => void;
  onAddLap: () => void;
}

//event handlers for the buttons
const StopWatchButton: React.FC<StopWatchButtonProps> = ({ onStart, onStop, onClear, onAddLap }) => {
  return (
    <div>
      <button className="start-button" onClick={onStart}>
        Start
      </button>
      <button className="stop-button" onClick={onStop}>
        Stop
      </button>
      <button className="clear-button" onClick={onClear}>
        Clear
      </button>
      <button className="lap-button" onClick={onAddLap}>
        Lap
      </button>
    </div>
  );
};

export default StopWatchButton;



