import React, { useState, useEffect } from 'react';
import Stopwatch from './StopWatch';
import StopwatchButton from './StopWatchButton';
import './styles/App.css';

const App: React.FC = () => {
  const [milliseconds, setMilliseconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [laps, setLaps] = useState<{ lapTime: number; currentTime: string }[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setMilliseconds((prev) => prev + 10);
      }, 10);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const handleStartStop = (): void => {
    setIsActive(!isActive);
  };

  const handleReset = (): void => {
    setMilliseconds(0);
    setLaps([]);
  };

  const handleLap = (): void => {
    if (isActive) {
      const currentTime = new Date().toLocaleString('en-US', {
        timeZone: 'EST',
        hour12: true,
      });
      setLaps((prevLaps) => [{ lapTime: milliseconds, currentTime }, ...prevLaps]);
    }
  };

  const handleClearLaps = (): void => {
    setLaps([]);
  };

  const formatLap = (milliseconds: number): string => {
    const hours = Math.floor(milliseconds / 3600000).toString().padStart(2, '0');
    const minutes = Math.floor((milliseconds % 3600000) / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((milliseconds % 60000) / 1000).toString().padStart(2, '0');
    const centiseconds = ((milliseconds % 1000) / 10).toFixed(0).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}.${centiseconds}`;
  };

  const handleExport = (): void => {
    const rows = [
      ["Lap", "Lap Time", "Elapsed Time", "Current Time & Date"],
      ...laps.map((lap, index, array) => [
        `Lap ${array.length - index}`,
        formatLap(lap.lapTime),
        index < array.length - 1 ? formatLap(lap.lapTime - array[index + 1].lapTime) : "00:00:00.00",
        `"${lap.currentTime}"` // Enclose the datetime in quotes
      ])
    ];
  
    let csvContent = "data:text/csv;charset=utf-8," 
      + rows.map(e => e.join(",")).join("\n");
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "lap_times.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };  

  return (
  <div className="app">
    <div className="header">
      <h1>Every Second Counts</h1>
    </div>
    <Stopwatch milliseconds={milliseconds} />
    <StopwatchButton
      isActive={isActive}
      onStartStop={handleStartStop}
      onReset={handleReset}
      onLap={handleLap}
      onClearLaps={handleClearLaps}
    />
    {laps.length > 0 && (
      <div className="laps-container">
        <div className="laps-title">
          <h2>Lap Times</h2>
        </div>
        <div className="laps-content">
          <div className="table-headers">
            <span>Lap #</span>
            <span>Lap Time</span>
            <span>Elapsed Time</span>
            <span>Current Time & Date</span>
          </div>
          {laps.map((lap, index) => (
            <div key={index} className="lap">
              <span className="lap-number">Lap {laps.length - index}</span>
              <span className="lap-time">{formatLap(lap.lapTime)}</span>
              <span className="lap-elapsed-time">{index < laps.length - 1 ? formatLap(lap.lapTime - laps[index + 1].lapTime) : "00:00:00.00"}</span>
              <span className="lap-current-time">{lap.currentTime}</span>
            </div>
          ))}
        </div>
        <div className="button-container">
          <button className="clear-laps" onClick={handleClearLaps}>Clear Laps</button>
          <button className="export-laps" onClick={handleExport}>Export</button>
        </div>
      </div>
    )}
  </div>
);

};

export default App;