import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';

/**
 * Renders and displays a Stopwatch component with a timer, buttons, and lap table.
 * @returns {React.ReactElement} A rendered display of the stopwatch.
 */
export default function StopWatch() {
  const [isRunning, setIsRunning] = useState(false); // stopwatch is running
  const [isStarted, setIsStarted] = useState(false); // stopwatch has been started (not reset)
  const [elapsedTime, setElapsedTime] = useState(0); // in ms
  const [laps, setLaps] = useState<{ lapNumber: number; time: number }[]>([]); // in ms

  // Find and highlight shortest and longest lap times if there are more than 2 laps
  let shortestLap = Number.MAX_SAFE_INTEGER;
  let longestLap = 0;
  if (laps.length > 2) {
    shortestLap = Math.min(...laps.map((lap) => lap.time));
    longestLap = Math.max(...laps.map((lap) => lap.time));
  }

  // If the stopwatch is running, update the elapsed time every 10ms
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Formats a given time (in ms) into a readable format (mm:ss.SS)
  const formatTime = (time: number) => {
    const milliseconds = (time % 1000) / 10;
    const seconds = Math.floor(time / 1000) % 60;
    const minutes = Math.floor(time / 60000) % 60;

    const formattedTime =
      `${minutes.toString().padStart(2, '0')}:` +
      `${seconds.toString().padStart(2, '0')}.` +
      `${milliseconds.toString().padStart(2, '0')}`;

    return formattedTime;
  };

  // Handlers for the stop, start, and reset
  const handleStart = () => {
    setIsRunning(true);
    setIsStarted(true);
  };
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setIsStarted(false);
    setElapsedTime(0);
    setLaps([]);
  };

  // Handler for the lap button
  // Our lap time is the current elapsed time minus the total of all previous lap times
  const handleLap = () => {
    const totalLapTimes = laps.reduce(
      (total, currLap) => total + currLap.time,
      0
    );
    const newLapTime = elapsedTime - totalLapTimes;
    setLaps([{ lapNumber: laps.length + 1, time: newLapTime }, ...laps]);
  };

  return (
    <div>
      <div className="timer-container">
        <h1 className="timer">{formatTime(elapsedTime)}</h1>
      </div>
      <StopWatchButton
        isRunning={isRunning}
        isStarted={isStarted}
        onStart={handleStart}
        onStop={handleStop}
        onReset={handleReset}
        onLap={handleLap}
      />
      <div className="lap-container">
        <div className="lap-list" data-testid="lap-list">
          {laps.map((lap) => {
            let className = 'lap-item';
            if (lap.time === shortestLap) className += ' lap-item-shortest';
            if (lap.time === longestLap) className += ' lap-item-longest';
            return (
              <div key={lap.lapNumber} className={className}>
                Lap {lap.lapNumber}: {formatTime(lap.time)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
