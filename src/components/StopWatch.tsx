import React from 'react';
import '../styles/StopWatch.css';

// Display time and laps
interface StopWatchProps {
  elapsedTime: number;  // The elapsed time to display
  laps?: number[];      // Optional laps to display
  showLaps?: boolean;   // Flag to show laps or not
}

const StopWatch: React.FC<StopWatchProps> = ({ elapsedTime, laps, showLaps }) => {
  // Format time to min:sec.milliseconds
  const formatTime = (time: number) => {
    // Helper function to format the time
    const milliseconds = `0${Math.floor(time / 10) % 100}`.slice(-2);
    const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
    const minutes = `0${Math.floor(time / 60000)}`.slice(-2);
    return `${minutes}:${seconds}.${milliseconds}`;
  };

  // Render the stopwatch display and laps
  return (
    <div className="stopwatch-display">
      {!showLaps && (
        <>
          {/* Render "Stopwatch" text and the stopwatch display (time) */}
          <h2>Stopwatch</h2>
          <div className="stopwatch-display">{formatTime(elapsedTime)}</div>
        </>
      )}
      {/* Render the laps list */}
      {showLaps && laps && (
        <>
          <h2>Laps</h2>
          <div className="lap-list"> {/* Make sure this class is defined in your CSS */}
            {laps.map((lap, index) => (
              <div key={index}><strong>Lap {index + 1}:</strong> {formatTime(lap)}</div>
            ))}
          </div>
        </>
      )}

    </div>
  );
};

export default StopWatch;