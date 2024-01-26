import React from 'react';
import '../styles/StopWatch.css';

// Display time and laps
interface StopWatchProps {
  elapsedTime: number;  // The elapsed time to display in milliseconds
  laps?: number[];      // Optional array of lap times in milliseconds
  showLaps?: boolean;   // Flag to control the display of laps
}

const StopWatch: React.FC<StopWatchProps> = ({ elapsedTime, laps, showLaps }) => {
  // Function to format time from milliseconds to min:sec.milliseconds format
  const formatTime = (time: number) => {
    const milliseconds = `0${Math.floor(time / 10) % 100}`.slice(-2);
    const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
    const minutes = `0${Math.floor(time / 60000)}`.slice(-2);
    return `${minutes}:${seconds}.${milliseconds}`;
  };

  // Main render method
  return (
    <>
      {/* Conditionally render the laps section if showLaps is true and laps data is available */}
      {showLaps && laps && (
        <div className="laps-container">
          <div className="lap-list">
            {/* Reverse map the laps to display the most recent lap first */}
            {[...laps].reverse().map((lap, index) => (
              <div key={laps.length - index - 1} className="lap-time">
                <strong>Lap {laps.length - index}:</strong> {formatTime(lap)}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Stopwatch display container */}
      <div className="stopwatch-container">
        <div className="stopwatch-time">
          {/* Stopwatch title */}
          <h2 className='stopwatch-title'>S t o p w a t c h</h2>
          {/* Display the formatted elapsed time */}
          <div className="time-display">{formatTime(elapsedTime)}</div>
        </div>
        {/* Placeholder for buttons, assuming they are rendered in another component */}
      </div>
    </>
  );
};

export default StopWatch;
