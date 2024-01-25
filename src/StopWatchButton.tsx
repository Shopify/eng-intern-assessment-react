/* 
    A separate React component that represents the stopwatch buttons.
*/

// import React and StopWatchButton CSS file
import React from 'react';
import './StopWatchButton.css'; 

// Create an interface to specify props for the StopWatchButton component
interface StopWatchButtonProps {
  isRunning: boolean;
  onStartStopClick: () => void;
  onResetLapClick: () => void;
}

export default function StopWatchButton({
  isRunning,
  onStartStopClick,
  onResetLapClick,
}: StopWatchButtonProps) {
  return (
    /* 
        We will only have two buttons on the screen to minimize visual clutter.
        - Button 1 (start/stop)
        - Button 2 (lap/reset)
        
        These states are paired to make it intuitive for the user. If the clock is stopped, 
        we shouldn't be able to lap. Instead, we would stop if we wanted to reset the entire clock.
        Likewise, when the clock is running, we should be able to record a lap.
    */
    <div className="button-container"> 
      <button className={isRunning ? 'stop-button' : 'start-button'} onClick={onStartStopClick}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button className={isRunning ? 'lap-button' : 'reset-button'} onClick={onResetLapClick}>
        {isRunning ? 'Lap' : 'Reset'}
      </button>
    </div>
  );
}
