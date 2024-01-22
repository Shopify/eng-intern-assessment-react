import React from 'react';

//display time and laps
interface StopWatchProps {
  elapsedTime: number;  // The elapsed time to display
  laps: number[];  // Array of lap times
}

const StopWatch: React.FC<StopWatchProps> = ({ elapsedTime, laps }) => {
  // Format time to min:sec.milliseconds
  const formatTime = (time: number) => {
    // Format time
    const milliseconds = `0${Math.floor(time / 10) % 100}`.slice(-2);
    const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
    const minutes = `0${Math.floor(time / 60000)}`.slice(-2);
    return `${minutes}:${seconds}.${milliseconds}`;
  };

  // Renders the stopwatch and laps
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
