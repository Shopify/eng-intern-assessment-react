import React, { useState, useRef } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import './App.css';

export default function App() {
  // State variables
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showLapTable, setShowLapTable] = useState<boolean>(false);

  // Refs for lap times and interval
  const lapTimesRef = useRef<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to start the stopwatch
  const startStopwatch = () => {
    if (!isRunning) {
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
      setIsRunning(true);
    }
  };

  // Function to stop the stopwatch
  const stopStopwatch = () => {
    if (isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  // Function to reset the stopwatch
  const resetStopwatch = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
    setTime(0);
    lapTimesRef.current = [];
    setShowLapTable(false); // Reset lap table visibility on reset
  };

  // Function to record a lap time
  const recordLap = () => {
    lapTimesRef.current.push(time);
    setShowLapTable(true); // Show lap table when lap is recorded
  };

  return (
    <div className="app-container">
      <div className="stopwatch">
        <StopWatch time={time} />
      </div>
      <div className="button-container">
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          {/* Button to start/stop the stopwatch */}
          <button
            className={`start-button ${isRunning ? 'stop-button' : ''}`}
            onClick={isRunning ? stopStopwatch : startStopwatch}
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>
          {/* Button to record a lap time */}
          <button disabled={!isRunning} onClick={recordLap}>
            Lap
          </button>
          {/* Button to reset the stopwatch */}
          <button className="reset-button" onClick={resetStopwatch}>
            Reset
          </button>
        </div>
      </div>
      {/* Display lap times in a centered table only when showLapTable is true */}
      {showLapTable && (
        <div className="lap-table-container">
          <table className="lap-table">
            <thead>
              <tr>
                <th>Lap</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through lap times to display them in a table */}
              {lapTimesRef.current.map((lapTime, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{formatTime(lapTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Helper function to format time as HH:MM:SS:SS
const formatTime = (time: number): string => {
  const ms = String(time % 1000).padStart(3, '0');
  const seconds = String(Math.floor(time / 1000) % 60).padStart(2, '0');
  const minutes = String(Math.floor(time / (60 * 1000)) % 60).padStart(2, '0');
  const hours = String(Math.floor(time / (60 * 60 * 1000))).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}:${ms}`;
};
