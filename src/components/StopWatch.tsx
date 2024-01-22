import React from 'react';

// StopWatch component to display time and laps
interface StopWatchProps {
  elapsedTime: number;
  laps: number[];
}

const StopWatch: React.FC<StopWatchProps> = ({ elapsedTime, laps }) => {

  // Format time to min:sec.milliseconds
  const formatTime = (time: number) => {
    const milliseconds = `0${Math.floor(time / 10) % 100}`.slice(-2);
    const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
    const minutes = `0${Math.floor(time / 60000)}`.slice(-2);
    return `${minutes}:${seconds}.${milliseconds}`;
  };

  // Renders stopwatch and laps
  return (
    <div>
      <h2>Stopwatch</h2>
      <div>{formatTime(elapsedTime)}</div>
      <div>
        <h3>Laps:</h3>
        {laps.map((lap, index) => (
          <div key={index}>{formatTime(lap)}</div>
        ))}
      </div>
    </div>
  );
};

export default StopWatch;
