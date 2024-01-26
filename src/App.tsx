import React, { useState, useRef } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import formatMilliseconds from './utils/formatMilliseconds';

export default function App() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [laps, setLaps] = useState<number[]>([]);
  const timerRef = useRef<NodeJS.Timer | null>(null)
  let secondsPassed: number = 0;

  const handleStart = () => {
    if (!isRunning) {
      setStartTime(Date.now() - elapsedTime);
      setIsRunning(true);

      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setNow(Date.now());
      }, 10);
    }
  }

  const handleStop = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setElapsedTime(now - startTime);
  }

  const handleLap = () => {
    // first lap
    if (laps.length === 0) {
      setLaps([secondsPassed])
    }
    // subsequent laps
    else {
      const currentLap = secondsPassed - laps.reduce((a, b) => a + b);
      console.log(currentLap)
      setLaps((prevLaps) => [...prevLaps, currentLap])
    }
  };

  const handleReset = () => {
    setStartTime(null);
    setNow(null);
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
    timerRef.current = null;
  };

  if (startTime !== null && now !== null) {
    secondsPassed = now - startTime;
  };

  // reset the stopwatch if it exceeds 1 hour
  if (secondsPassed > 3600000) {
    alert('stopwatch running for more than 1 hour - resetting');
    handleReset();
  }

  return (
    <main>
      <StopWatch
        timer={formatMilliseconds(secondsPassed)}
      />
      <div>
        <StopWatchButton
          label={isRunning ? 'Stop' : 'Start'}
          clickHandler={isRunning ? handleStop : handleStart}
        />
        <StopWatchButton
          label={isRunning ? 'Lap' : 'Reset'}
          clickHandler={isRunning ? handleLap : handleReset}
        />
      </div>
      <ol data-testid='laps'>
        <h2>Laps</h2>
        {laps && laps.map((lap, idx) => (
          <li key={idx} data-testid={`lap-item-${idx + 1}`}>{formatMilliseconds(lap)}</li>
        ))}
      </ol>
    </main>
  )
}