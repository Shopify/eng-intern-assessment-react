import React from 'react';
import './styles/StopWatchButtons.css';

interface StopWatchButtonProps {
  onStartStopClick: () => void;
  onResetLapClick: () => void;
  clockstart: boolean;
}

//Stopwatch buttons component 
export default function StopWatchButton({
  onStartStopClick,
  onResetLapClick,
  clockstart,
}: StopWatchButtonProps) {
  return (
    <div className = "centered"> {/*conditionally shows the stop, start, lap and reset buttons based on whether the stopwatch is running*/}
      <button className={`stopwatch-button ${clockstart ? 'stop-button' : 'start-button'}`} onClick={onStartStopClick}> 
    {clockstart ? 'Stop' : 'Start'}</button>
      <button className={`stopwatch-button ${clockstart ? 'lap-button' : 'reset-button'}`} onClick={onResetLapClick}>{clockstart ? 'Lap' : 'Reset'}</button>
    </div>
  );
}
