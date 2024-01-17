import React from 'react';
import './styles/StopWatch.css';

interface StopwatchProps {
  milliseconds: number;
}

const Stopwatch: React.FC<StopwatchProps> = ({ milliseconds }) => {
  const formatTime = (ms: number) => {
    const centiseconds = ('0' + (Math.floor(ms / 10) % 100)).slice(-2);
    const seconds = ('0' + (Math.floor(ms / 1000) % 60)).slice(-2);
    const minutes = ('0' + (Math.floor(ms / 60000) % 60)).slice(-2);
    const hours = ('0' + Math.floor(ms / 3600000)).slice(-2);
    return { hours, minutes, seconds, centiseconds };
  };

  const { hours, minutes, seconds, centiseconds } = formatTime(milliseconds);

  return (
    <div className="stopwatch">
      <div className="time-card">
        <span className="time">{hours}</span>
        <span className="label">HOURS</span>
      </div>
      <span className="colon">:</span>
      <div className="time-card">
        <span className="time">{minutes}</span>
        <span className="label">MINUTES</span>
      </div>
      <span className="colon">:</span>
      <div className="time-card">
        <span className="time">{seconds}</span>
        <span className="label">SECONDS</span>
      </div>
      <div className="milliseconds-card">
        <span className="milliseconds">.{centiseconds}</span>
      </div>
    </div>
  );
};

export default Stopwatch;