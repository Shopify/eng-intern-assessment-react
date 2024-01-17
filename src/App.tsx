import React, { useState, useRef } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import LapsDisplay from './LapsDisplay';

export type Time = {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
};

const calculateTime = (totalMilliseconds: number): Time => {
  const hours = Math.floor(totalMilliseconds / 3600000); // 3600000 milliseconds in an hour
  const minutes = Math.floor((totalMilliseconds % 3600000) / 60000); // 60000 milliseconds in a minute
  const seconds = Math.floor((totalMilliseconds % 60000) / 1000); // 1000 milliseconds in a second
  const milliseconds = Math.floor((totalMilliseconds % 1000) / 10); // rounding to two digits

  return { hours, minutes, seconds, milliseconds };
};

export const timeToString = (timeObject: Time): string => {
  const { hours, minutes, seconds, milliseconds } = timeObject;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}

export default function App() {
  const [milliseconds, setMilliseconds] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<String[]>([]);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    setRunning(true);
    intervalId.current = setInterval(() => {
      setMilliseconds(prev => prev + 10);
    }, 10);
  }
  
  const stop = () => {
    setRunning(false);
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null; // Reset the intervalId to null
    }
  };  
  
  // Reset button resets the timer to zero but does not stop the timer from running
  const resetTimer = () => {
    setMilliseconds(0);
  }
  
  const recordLap = () => {
    setLaps([...laps, timeToString(calculateTime(milliseconds))]);
  }
  
  const clearLaps = () => {
    setLaps([]);
  }

  return(
    <>
      <StopWatch duration={calculateTime(milliseconds)} />
      {running ?
        <StopWatchButton label='Stop' action={stop} /> :
        <StopWatchButton label='Start' action={start} />
      }
      <StopWatchButton label='Lap' action={recordLap} />
      <StopWatchButton label='Reset Timer' action={resetTimer} />
      {laps.length > 0 && 
        <>
          <StopWatchButton label='Clear Laps' action={clearLaps} />
          <LapsDisplay laps={laps} />
        </>
      }
    </>
  )
}