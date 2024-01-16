import React from 'react';
import './styles/StopWatchButtons.css';

interface StopWatchButtonProps {
  onStartStopClick: () => void;
  onResetLapClick: () => void;
  isRunning: boolean;
}

//Stopwatch buttons component 
export default function StopWatchButton({
  onStartStopClick,
  onResetLapClick,
  isRunning,
}: StopWatchButtonProps) {
  return (
    <div className = "centered"> {/*conditionally shows the stop, start, lap and reset buttons based on whether the stopwatch is running*/}
      <button className={`stopwatch-button ${isRunning ? 'stop-button' : 'start-button'}`} onClick={onStartStopClick}> 
    {isRunning ? 'Stop' : 'Start'}</button>
      <button className={`stopwatch-button ${isRunning ? 'lap-button' : 'reset-button'}`} onClick={onResetLapClick}>{isRunning ? 'Lap' : 'Reset'}</button>
    </div>
  );
}
