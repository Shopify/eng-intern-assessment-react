import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';

type firstDigits = 11 | 14; // have the first digits be hours or minutes
type lastDigits = 19 | 21 | 22; // have the last digits be seconds, tenths of a second, or hundredths of a second

export default function Stopwatch(){
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);
  const [stoppedLaps, setStoppedLaps] = useState<boolean>(false);
  const firstDigits: firstDigits = 14;
  const lastDigits: lastDigits = 21;


  // use effect block will update the time every 10 milliseconds
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (running) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [running]);


  const startStopwatch = (): void => {
    setRunning(true)
    setStoppedLaps(false)
  };
  const stopStopwatch = (): void => setRunning(false);
  const lapStopwatch = (): void => {
    setLaps([...laps, time])
    if (!running){
        setStoppedLaps(true)
    }
  };
  const resetStopwatch = (): void => {
    setTime(0);
    setLaps([]);
    setRunning(false);
    setStoppedLaps(false)
  };

  return (
    <div>
      <h2>Stopwatch</h2>
      <div>Time: {new Date(time).toISOString().slice(firstDigits, lastDigits)}</div>
      <StopWatchButton onClick={startStopwatch} text="Start" />
      <StopWatchButton onClick={stopStopwatch} text="Stop" />
      <StopWatchButton onClick={lapStopwatch} text="Lap" />
      <StopWatchButton onClick={resetStopwatch} text="Reset" />
      {laps.length > 0 && (
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>Lap {index + 1}: {new Date(lap).toISOString().slice(firstDigits, lastDigits)}</li>
          ))}
        </ul>
      )}
    </div>
  );
};