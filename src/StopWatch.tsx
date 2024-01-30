import React, { useEffect, useState } from 'react';
import './css/App.css';

export default function StopWatch(props: any) {
  const [time, setTime] = useState(0);
  const [timeDisplay, setTimeDisplay] = useState<Array<number | string>>([]);
  const [intervalNumber, setIntervalNumber] = useState<number>(0);

  const convertTimeToDisplay = (time: number): (number | string)[] => {
    const formatTime = (value: number): string => (value < 10 ? `0${value}` : `${value}`);

    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - hours * 3600) / 60);
    const seconds = time - minutes * 60 - hours * 3600;

    return [formatTime(hours), formatTime(minutes), formatTime(seconds)];
  };

  useEffect(() => {
    const handleInterval = () => {
      setTime((prevTime) => prevTime + 1);
    };

    if (props.isRunning) {
      const interval = setInterval(handleInterval, 1000);
      setIntervalNumber(interval);
    } else {
      clearInterval(intervalNumber);
    }

    if (props.reset) {
      clearInterval(intervalNumber);
      setTime(0);
    }

    setTimeDisplay(convertTimeToDisplay(time));
  }, [props.isRunning, props.reset, time, intervalNumber]);

  return (
    <main className='timer-display'>
      <p id='hour'>{timeDisplay[0]}</p>
      <span>:</span>
      <p id='minute'>{timeDisplay[1]}</p>
      <span>:</span>
      <p id='second'>{timeDisplay[2]}</p>
    </main>
  );
}
