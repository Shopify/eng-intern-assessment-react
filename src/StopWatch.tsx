import React, { useState, useEffect, useRef } from 'react';
import StopWatchButton from './StopWatchButton';
import './StopWatch.css';

export default function StopWatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lapTimes, setLapTimes] = useState<{ lap: number; time: number }[]>([]);
  const [lapCount, setLapCount] = useState(0);

  const [buttonColor, setButtonColor] = useState<string>('#0B2B11');
  const [textColor, setTextColor] = useState<string>('#45C465');

  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timer.current = setInterval(() => setTime((prevTime) => prevTime + 1), 10);
    }

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [isRunning]);

  const startStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
    setButtonColor((prevColor) => (isRunning ? '#0B2B11' : '#330D0B'));
    setTextColor((prevColor) => (isRunning ? '#45C465' : '#E5493C'));
  };

  const resetLap = () => {
    if (isRunning) {
      setLapTimes((prevLapTimes) => [{ lap: lapCount + 1, time: time }, ...prevLapTimes]);
      setLapCount((prevLapCount) => prevLapCount + 1);
    } else {
      setTime(0);
      setLapCount(0);
      setIsRunning(false);
      setLapTimes([]);
    }
  };

  const formatTime = (timeValue: number): string => {
    const hours = String(Math.floor(timeValue / 360000)).padStart(2, '0');
    const minutes = String(Math.floor((timeValue % 360000) / 6000)).padStart(2, '0');
    const seconds = String(Math.floor((timeValue % 6000) / 100)).padStart(2, '0');
    const milliseconds = String(Math.floor(timeValue % 100)).padStart(2, '0');

    if(Math.floor(timeValue / 360000) > 0){
      return `${hours}:${minutes}:${seconds}.${milliseconds}`; 
    }

    return `${minutes}:${seconds}.${milliseconds}`;
  };
  return (
    <div>
      <div className="time">
        {formatTime(time)}
      </div>
      <div>
        <StopWatchButton
          isRunning={isRunning}
          startStop={startStop}
          resetLap={resetLap}
          buttonColor={buttonColor}
          textColor={textColor}
        />
        <ul className="lap-list">
          <li></li>
        {lapTimes.map((lap, index) => (
            <li key={index}>
              Lap {lap.lap} &emsp; &emsp; &emsp; &emsp; {formatTime(lap.time)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
