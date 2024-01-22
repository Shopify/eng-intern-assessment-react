import React, { useState, useEffect } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';

export default function App() {
  const [timer, setTimer] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleLap = () => {
    // take current timer value and push into laps array
    laps.push(timer);
  };

  const handleReset = () => {
    setTimer(0);
    setIsRunning(false);
    setLaps([]);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timer;
    if (isRunning) {
      intervalId = setInterval(() => setTimer(timer + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, timer])

  return (
    <div>
      <StopWatch
        timer={timer}
      />
      <div>
        <StopWatchButton
          label={isRunning ? 'Stop' : 'Start'}
          clickHandler={handleStartStop}
        />
        <StopWatchButton
          label={isRunning ? 'Lap' : 'Reset'}
          clickHandler={isRunning ? handleLap : handleReset }
        />
      </div>
      <div>
        {laps && laps.map((lap) => (
          <p>{lap.toString()}</p>
        ))}
      </div>
    </div>
  )
}