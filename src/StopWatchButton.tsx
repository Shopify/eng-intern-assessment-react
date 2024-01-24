import React from 'react';

interface StopwatchButtonProps {
  isRunning: boolean;
  onStartStop: () => void;
  onReset: () => void;
  onLap: () => void;
}

const StopwatchButtons: React.FC<StopwatchButtonProps> = ({
  isRunning,
  onStartStop,
  onReset,
  onLap,
}) => {
  return (
    <div>
      <button onClick={onStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
      <button onClick={onReset}>Reset</button>
      <button onClick={onLap}>Lap</button>
    </div>
  );
};

export default StopwatchButtons;
