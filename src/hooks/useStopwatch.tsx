import { useState, useEffect, useRef } from 'react';

// Function to get stored time from local storage
function getStoredTime() {
  const storedTime = localStorage.getItem('stopwatch_time');
  return storedTime ? parseFloat(storedTime) : 0;
}

// Function to get stored laps from local storage
function getStoredLaps() {
  const storedLaps = localStorage.getItem('stopwatch_laps');
  return storedLaps ? JSON.parse(storedLaps) : [];
}

function useStopwatch() {
  const [time, setTime] = useState(getStoredTime);
  const [laps, setLaps] = useState(getStoredLaps);
  const [isStarted, setIsStarted] = useState(false);
  const requestIdRef = useRef<number>();

  useEffect(() => {
    let prevTime: number;

    if (isStarted) {
      requestIdRef.current = requestAnimationFrame(function updateTimer(
        timestamp: number
      ) {
        if (!prevTime) prevTime = timestamp;
        const deltaMs = timestamp - prevTime;
        prevTime = timestamp;
        setTime((prev) => prev + deltaMs);
        requestIdRef.current = requestAnimationFrame(updateTimer);
      });
    } else {
      cancelAnimationFrame(requestIdRef.current);
    }

    return () => {
      cancelAnimationFrame(requestIdRef.current);
    };
  }, [isStarted]);

  useEffect(() => {
    localStorage.setItem('stopwatch_laps', JSON.stringify(laps));
  }, [laps]);

  const startTimer = () => {
    setIsStarted(true);
  };

  const stopTimer = () => {
    setIsStarted(false);
    localStorage.setItem('stopwatch_time', time.toString());
  };

  const resetTimer = () => {
    setIsStarted(false);
    setTime(0);
    setLaps([]);
    localStorage.setItem('stopwatch_time', '0');
    localStorage.setItem('stopwatch_laps', JSON.stringify([]));
  };

  const addLap = () => {
    // Get the last lap
    const lastLap = laps.length > 0 ? laps[laps.length - 1] : null;

    // Check if there is a last lap and if the current time is different from the last lap's timestamp
    if (lastLap) {
      if (lastLap.timestamp === time) return;
      setLaps((prevLaps: { timestamp: number; duration: number }[]) => [
        ...prevLaps,
        { timestamp: time, duration: time - lastLap.timestamp },
      ]);
    } else {
      setLaps((prevLaps: { timestamp: number; duration: number }[]) => [
        ...prevLaps,
        { timestamp: time, duration: time },
      ]);
    }
  };

  return {
    time,
    laps,
    isStarted,
    startTimer,
    stopTimer,
    resetTimer,
    addLap,
  };
}

export default useStopwatch;
