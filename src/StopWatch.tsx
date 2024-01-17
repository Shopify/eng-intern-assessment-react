import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';

interface StopwatchProps {}

const Stopwatch: React.FC<StopwatchProps> = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<moment.Moment | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [laps, setLaps] = useState<string[]>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startStopwatch = () => {
    if (!isRunning) {
      setIsRunning(true);
      setStartTime(moment());
      timerRef.current = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 10);
      }, 10);
    } else {
      setIsRunning(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    setStartTime(null);
    setElapsedTime(0);
    setLaps([]);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const lap = () => {
    if (startTime && isRunning) {
      const lapTime = moment.duration(moment().diff(startTime)).asMilliseconds();
      console.log(lapTime)
      setLaps((prevLaps) => [...prevLaps, formatTime(lapTime)]);
      setStartTime(moment());
    }
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      <div>
        {formatTime(elapsedTime)}
      </div>
      <button onClick={startStopwatch}>{isRunning ? 'Stop' : 'Start'}</button>
      <button onClick={resetStopwatch}>Reset</button>
      <button onClick={lap}>Lap</button>
      <div>
        <h2>Laps</h2>
        <ul>
          {laps.map((lapTime, index) => (
            <li key={index}>{lapTime}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const formatTime = (milliseconds: number): string => {
  const duration = moment.duration(milliseconds);
  return `${String(duration.minutes()).padStart(2, '0')}:${String(duration.seconds()).padStart(2, '0')}:${String(Math.floor(duration.milliseconds() / 10)).padStart(2, '0')}`;
};

export default Stopwatch;
