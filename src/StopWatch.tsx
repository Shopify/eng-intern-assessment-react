import React, {useEffect, useState} from 'react';

export default function StopWatch() {
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    // Set up an interval to increment the elapsed time
    const INTERVAL = 10; // 10 ms
    const intervalId = setInterval(() => {
      setElapsedTime(prevTime => prevTime + INTERVAL);
    }, INTERVAL);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    const displayedMilliseconds = Math.floor((milliseconds % 1000) / 10); // Only two decimal places
    const displayedSeconds = totalSeconds % 60;
    const displayedMinutes = totalMinutes % 60;
    const displayedHours = totalHours;

    return [displayedHours, displayedMinutes, displayedSeconds, displayedMilliseconds]
      .map(v => v < 10 ? "0" + v : v)
      .join(":");
  }

    return(
      <div>{formatTime(elapsedTime)}</div>
    )
}