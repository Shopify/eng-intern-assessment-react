import { useState, useEffect, useRef } from 'react';

export enum StopwatchStatus {
  Initial,
  Running,
  Paused,
}

export const useStopWatch = () => {
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [stopwatchStatus, setStopwatchStatus] = useState<StopwatchStatus>(
    StopwatchStatus.Initial
  );
  const [laps, setLaps] = useState<number[]>([]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (stopwatchStatus === StopwatchStatus.Running) {
      startTimeRef.current = Date.now() - timeElapsed;
      intervalRef.current = setInterval(() => {
        setTimeElapsed(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [stopwatchStatus]);

  const startStopwatch = () => {
    setStopwatchStatus(StopwatchStatus.Running);
    if (laps.length < 1) {
      setLaps([0]);
    }
  };

  const stopStopwatch = () => {
    setStopwatchStatus(StopwatchStatus.Paused);
  };

  const resetStopwatch = () => {
    setTimeElapsed(0);
    setLaps([]);
    setStopwatchStatus(StopwatchStatus.Initial);
  };

  const recordLap = () => {
    const totalLapseTime = laps.reduce((acc, lapTime) => acc + lapTime, 0);
    const newLapTime = timeElapsed - totalLapseTime;
    setLaps([newLapTime, ...laps]);
  };

  const currentLapTime = timeElapsed - laps.reduce((acc, lap) => acc + lap, 0);

  return {
    timeElapsed,
    stopwatchStatus,
    stopStopwatch,
    startStopwatch,
    resetStopwatch,
    laps,
    recordLap,
    currentLapTime,
  };
};
