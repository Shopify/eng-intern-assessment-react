import React from 'react';

interface StopwatchProps {
  time: number;
  laps: number[];   // Array of lap times in milliseconds
}

// Format time in HH:MM:SS.mm format
const formatTime = (time: number) => {
  const milliseconds = Math.floor((time % 1000) / 10);
  const seconds = Math.floor(time / 1000) % 60;
  const minutes = Math.floor(time / 60000) % 60;
  const hours = Math.floor(time / 3600000);

  // Format time components with leading zeros
  const formattedMilliseconds = String(milliseconds).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedHours = String(hours).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
};

export default function Stopwatch({ time, laps }: StopwatchProps) {
  return (
    <div>
      <h2 className='stopwatch'>{formatTime(time)}</h2>

      <div className="laps-container">
        <div className="laps-header">
          <span className="lap-number-title">Lap No.</span>
          <span className="lap-time-title">Time</span>
        </div>
        <div className="header-line"></div>
        <div className="laps-list">
          {/* Render the list of laps with lap number and lap time */}
          {laps.map((lap, index) => (
            <div key={index} className="lap-item">
              <span className="lap-number">Lap {index + 1}</span>
              <span className="lap-time">{formatTime(lap)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}