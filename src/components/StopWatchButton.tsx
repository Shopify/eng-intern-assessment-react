import React from 'react';
import '../styles/StopWatchButton.css';

// Interface for the stopwatch control buttons properties
interface StopWatchButtonProps {
  isRunning: boolean;  // Indicates if the stopwatch is currently running
  isPaused: boolean;   // Indicates if the stopwatch is currently paused
  start: () => void;   // Function to start or resume the timer
  pause: () => void;   // Function to pause the timer
  reset: () => void;   // Function to reset the timer to initial state
  lap: () => void;     // Function to record a lap time
  startTime: number | null; // The start time of the stopwatch, null when not started
}

// Function to change the CSS variables on hover, enhancing UI interactivity
const changeColorOnHover = (color: string): void => {
  document.documentElement.style.setProperty('--color1', color);
  document.documentElement.style.setProperty('--color2', color);
  document.documentElement.style.setProperty('--color3', color);
  document.documentElement.style.setProperty('--color4', color);
  document.documentElement.style.setProperty('--color5', color);
};

// Function to reset the CSS variables when hover is removed, returning to default state
const resetColorOnHover = (): void => {
  document.documentElement.style.setProperty('--color1', '149, 191, 71');
  document.documentElement.style.setProperty('--color2', '149, 191, 71');
  document.documentElement.style.setProperty('--color3', '149, 191, 71');
  document.documentElement.style.setProperty('--color4', '149, 191, 71');
  document.documentElement.style.setProperty('--color5', '149, 191, 71');
};

// Functional component rendering the stopwatch buttons with conditional rendering
const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  isRunning,
  isPaused,
  start,
  pause,
  reset,
  lap,
}) => {
  return (
    <div className='buttons'>
      {/* Render "Start" and a disabled "Lap" button when the timer is neither running nor paused */}
      {!isRunning && !isPaused && (
        <>
          <button className="stopwatch-button start-resume" onClick={start}>Start</button>
          <button className="stopwatch-button" disabled>Lap</button>
        </>
      )}

      {/* Render "Pause" and "Lap" buttons when the timer is running */}
      {isRunning && (
        <>
          <button className="stopwatch-button pause" onMouseEnter={() => 
            changeColorOnHover('255, 205, 0')} onMouseLeave={resetColorOnHover} onClick={pause}>Pause</button>
          <button className="stopwatch-button lap" onMouseEnter={() => 
            changeColorOnHover('0, 161, 233')} onMouseLeave={resetColorOnHover} onClick={lap}>Lap</button>
        </>
      )}

      {/* Render "Resume" and "Reset" buttons when the timer is paused */}
      {isPaused && (
        <>
          <button className="stopwatch-button start-resume" 
          onClick={start}>Resume</button>
          <button className="stopwatch-button reset" onMouseEnter={() => 
          changeColorOnHover('237, 28, 36')} onMouseLeave={resetColorOnHover} onClick={reset}>Reset</button>
        </>
      )}
    </div>
  );
};

export default StopWatchButton;
