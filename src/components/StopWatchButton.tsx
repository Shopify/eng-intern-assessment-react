import React from 'react';

// interface for StopWatchButton component
interface StopWatchButtonProps {
  isRunning: boolean;
  handleStartStopClick: () => void;
  handleLapClick: () => void;
  handleResetClick: () => void;
}

// button elements for controlling the stopwatch
const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  isRunning,
  handleStartStopClick,
  handleLapClick,
  handleResetClick,
}) => {
  // Dynamic styling based on whether the stopwatch is running
  const buttonStyle = {
    backgroundColor: isRunning ? '#ff3333' : '#16be2c',
    borderColor: isRunning ? '#ff3333' : '#33ff00',
  };

  // render the button elements for start/stop, lap, and reset actions
  return (
    <div className="buttons-container">
      <button style={buttonStyle} onClick={handleStartStopClick}>
        {isRunning ? 'STOP' : 'START'}
      </button>
      <button onClick={handleLapClick} disabled={!isRunning}>
        LAP
      </button>
      <button onClick={handleResetClick}>RESET</button>
    </div>
  );
};

export default StopWatchButton;
