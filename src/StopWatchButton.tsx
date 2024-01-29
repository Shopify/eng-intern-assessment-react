import React from 'react';

interface StopWatchButtonProps {
  stopCount: () => void;
  startCount: () => void;
  resetCount: () => void;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  stopCount,
  startCount,
  resetCount,
}) => {
  return (
    <>
      <h1>Stop Watch Button</h1>
      {/* Buttons display */}
      <button onClick={startCount}>Start</button>
      <button onClick={stopCount}>Stop</button>
      <button onClick={resetCount}>Reset</button>
    </>
  );
};

export default StopWatchButton;
