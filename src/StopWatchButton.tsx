import React, { useState, useEffect } from 'react'; //Using use state to track state and use effect to update when a change is detected

export default function StopWatchButton() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [lapTimes, setLapTimes] = useState<number[]>([]);

  const start = () => {
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setLapTimes([]);
  };

  const lap = () => {
    if (isRunning) {
      setLapTimes((prevLapTimes) => [...prevLapTimes, elapsedTime]);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  return (
    <div>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
      <button onClick={lap}>Lap</button>

      <div>
        <h2>Lap Times:</h2>
        <ul>
          {lapTimes.map((lapTime, index) => (
            <li key={index}>Lap {index + 1}: {lapTime}s</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
