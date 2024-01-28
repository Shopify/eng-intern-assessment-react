
import React from 'react';
import StopWatchButton from './StopWatchButton';

//defining functions, I think? pretty green with TS
interface StopWatchProps {
  handleStart: () => void; //i.e. nothing is returned(?)
  handleStop: () => void;
  handleLap: () => void;
  handleReset: () => void;
}

//destructuring props from App
const StopWatch: React.FC<StopWatchProps> = ({
  handleStart,
  handleStop,
  handleLap,
  handleReset,
}) => {
  return (
    <div>
      <StopWatchButton onClick={handleStart} label="Start" />
      <StopWatchButton onClick={handleStop} label="Stop" />
      <StopWatchButton onClick={handleLap} label="Lap" />
      <StopWatchButton onClick={handleReset} label="Reset" />
    </div>
  );
};

export default StopWatch;
