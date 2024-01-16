import React, { useState, useEffect } from 'react';
import Stopwatch from './StopWatch';
import StopwatchButton from './StopWatchButton';
import './styles/App.css';



const App = () => {
  const [milliseconds, setMilliseconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setMilliseconds((prev) => prev + 10);
      }, 10);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const handleStartStop = () => setIsActive(!isActive);
  
  const handleReset = () => {
    setMilliseconds(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps([milliseconds, ...laps]);
  };
  
  const formatLap = (milliseconds: number): string => {
    const hours = Math.floor(milliseconds / 3600000).toString().padStart(2, '0');
    const minutes = Math.floor((milliseconds % 3600000) / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((milliseconds % 60000) / 1000).toString().padStart(2, '0');
    const centiseconds = ((milliseconds % 1000) / 10).toFixed(0).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}.${centiseconds}`;
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Timer</h1>
      </div>
      <Stopwatch milliseconds={milliseconds} />
      <StopwatchButton
        isActive={isActive}
        onStartStop={handleStartStop}
        onReset={handleReset}
        onLap={handleLap}
      />
      <div className="laps-container">
        <h2>Lap Times</h2>
        <div className="laps">
          {laps.map((lap, index) => (
            <div key={index} className="lap-time">
              Lap {laps.length - index}: {formatLap(lap)}
            </div>
          ))}
        </div>
        <button className="clear-laps">Clear Laps</button>
      </div>
    </div>
  );
};

export default App;