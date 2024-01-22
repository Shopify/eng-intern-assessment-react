import React from 'react';

// StopWatch components
interface StopWatchProps {
  elapsedTime: number;
}

const StopWatch: React.FC<StopWatchProps> = ({ elapsedTime }) => {

  // Format time to min:sec.milisec 
  const formatTime = (time: number) => {
    const milliseconds = `0${Math.floor(time / 10) % 100}`.slice(-2);
    const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
    const minutes = `0${Math.floor(time / 60000)}`.slice(-2);
    return `${minutes}:${seconds}.${milliseconds}`;
  };


  // Stopwatch UI
  return (
    <div>
      <h2>Stopwatch</h2>
      <div>{formatTime(elapsedTime)}</div>
    </div>
  );
};

export default StopWatch;
