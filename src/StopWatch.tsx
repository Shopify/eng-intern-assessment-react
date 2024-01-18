import React from 'react';
import './styles/StopWatch.css';

// Props interface for the Stopwatch component
interface StopwatchProps {
  milliseconds: number; // Total milliseconds to display
}

const Stopwatch: React.FC<StopwatchProps> = ({ milliseconds }) => {
  // Function to format the time from milliseconds to hours, minutes, seconds, and centiseconds
  const formatTime = (ms: number) => {
    // Convert milliseconds into centiseconds, seconds, minutes, and hours
    const centiseconds = ('0' + (Math.floor(ms / 10) % 100)).slice(-2);
    const seconds = ('0' + (Math.floor(ms / 1000) % 60)).slice(-2);
    const minutes = ('0' + (Math.floor(ms / 60000) % 60)).slice(-2);
    const hours = ('0' + Math.floor(ms / 3600000)).slice(-2);
    return { hours, minutes, seconds, centiseconds };
  };

  // Destructure the formatted time for display
  const { hours, minutes, seconds, centiseconds } = formatTime(milliseconds);

  return (
    // Stopwatch display, consisting of time cards for hours, minutes, seconds, and milliseconds
    <div className="stopwatch">
      {/* Time card for hours */}
      <div className="time-card">
        <span className="time">{hours}</span>
        <span className="label">HOURS</span>
      </div>
      {/* Colon separator */}
      <span className="colon">:</span>
      {/* Time card for minutes */}
      <div className="time-card">
        <span className="time">{minutes}</span>
        <span className="label">MINUTES</span>
      </div>
      {/* Colon separator */}
      <span className="colon">:</span>
      {/* Time card for seconds */}
      <div className="time-card">
        <span className="time">{seconds}</span>
        <span className="label">SECONDS</span>
      </div>
      {/* Card for displaying centiseconds */}
      <div className="milliseconds-card">
        <span className="milliseconds">.{centiseconds}</span>
      </div>
    </div>
  );
};

export default Stopwatch;