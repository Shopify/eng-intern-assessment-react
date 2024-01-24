import React, { useState, useRef } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';

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

  return (
    <main>
      <StopWatch
        timer={isRunning ? formatMilliseconds(secondsPassed) : formatMilliseconds(elapsedTime)}
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
      <div>
        {laps && laps.map((lap, idx) => (
          <p key={idx}>{formatMilliseconds(lap)}</p>
        ))}
      </div>
    </main>
  )
}

function formatMilliseconds(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const formattedTime = `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds % 1000, 2)}`;

  return formattedTime;
}

function pad(number: number, length = 2): string {
  return String(number).padStart(length, '0');
}