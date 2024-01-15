import React from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import { useState, useEffect } from 'react'

export default function App() {
  const [isRunning, setIsRunning] = useState(false)
  const [time, setTime] = useState(0)
  let interval: NodeJS.Timer | undefined;

  const start = () => {
    if (isRunning) {
      setIsRunning(false);
    } else if (!isRunning) {
      setIsRunning(true);
    }
  }

  const reset = () => {
    if (!isRunning) {
      setTime(0)
    }
  }

  useEffect(() => {
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 0.01); // Increment by 0.01 seconds (10 milliseconds)
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  return(
    <div>
      <StopWatch time={time}/>
      <StopWatchButton start={start} reset={reset} isRunning={isRunning}/>
    </div>
  )
}