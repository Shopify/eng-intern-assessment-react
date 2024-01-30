import React, { useEffect, useState } from 'react';
import LapList from './LapList';
import StopWatchButton from './StopWatchButton';
import { Lap, Time } from './Types';
import { formatTime } from './utils';

export default function StopWatch() {
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState<Lap[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  // Set the time for the timer
  useEffect(() => {
    let intervalId: NodeJS.Timer;
    if (isRunning) {
      // Use setInterval to increment time every 10 milliseconds
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  // Calculate hours, minutes, seconds, milliseconds
  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  // Start and stop timer & label
  const startStopLabel = isRunning ? 'Stop' : 'Start';
  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  // Reset timer
  const reset = () => {
    setTime(0);
  };

  // Add a lap based on current time
  const lap = () => {
    const currentTime: Time = {
      hours,
      minutes,
      seconds,
      milliseconds,
    };
    const lap: Lap = {
      time: currentTime,
      lapNumber: laps.length + 1,
    };
    setLaps((laps) => [lap, ...laps]);
  };

  return (
    <div className='grid w-full mx-auto p-16 gap-6'>
      <p
        className='text-4xl flex justify-center text-slate-950'
        data-testid='timer'
      >
        {formatTime(hours, minutes, seconds, milliseconds)}
      </p>
      <div className='flex gap-8 justify-center'>
        <StopWatchButton label={startStopLabel} handleClick={startAndStop} />
        <StopWatchButton label='Reset' handleClick={reset} />
        <StopWatchButton label='Lap' handleClick={lap} />
      </div>
      <div className='flex justify-center'>
        <LapList laps={laps} />
      </div>
    </div>
  );
}
