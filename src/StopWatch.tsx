import React, {useEffect, useState} from 'react';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [active, setActive] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);
  const [currentLapTime, setCurrentLapTime] = useState<number>(0);

  useEffect(() => {
    if (!active) return;

    // Set up an interval to increment the elapsed time and lap time
    const INTERVAL = 10; // 10 ms
    const intervalId = setInterval(() => {
      setElapsedTime(prevTime => prevTime + INTERVAL);
      setCurrentLapTime(prevLap => prevLap + INTERVAL);
    }, INTERVAL);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [active]);

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

  const handleStartStopClick = () => {
    setActive(prevActive => !prevActive);
  }

  const handleLapResetClick = () => {
    // Reset the elapsed time if the stopwatch is inactive
    if (!active) {
      setElapsedTime(0);
      setLaps([]);
      return;
    } else {
      // Otherwise, add the current lap time to the laps
      setLaps(prevLaps => [...prevLaps, currentLapTime]);
      setCurrentLapTime(0);
    }
  }

  return (
    <div>
      <div>{formatTime(elapsedTime)}</div>
      <StopWatchButton labels={["Reset", "Lap"]} active={active} onClick={handleLapResetClick}/>
      <StopWatchButton labels={["Start", "Stop"]} active={active} onClick={handleStartStopClick}/>
      <hr />
      <ul>
        <li>Lap {laps.length + 1} {formatTime(currentLapTime)}</li>
        {[...laps].reverse().map((lap, index) => (
          <li key={index}>Lap {laps.length - index} {formatTime(lap)}</li>
        ))}
      </ul>
    </div>
  )
}