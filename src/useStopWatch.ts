import { useState, useEffect, useRef } from 'react';

enum StopwatchStatus {
  Stopped,
  Running,
  Paused,
}

export const useStopWatch = () => {
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [stopwatchStatus, setStatus] = useState<StopwatchStatus>(
    StopwatchStatus.Stopped
  );

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
    setStatus(StopwatchStatus.Running);
  };

  return {
    timeElapsed,
    startStopwatch,
  };
};
