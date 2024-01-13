import React, { useEffect, useState } from 'react';
import { toStopWatchFormat } from './utils/time';
import { StopWatchState } from './resources/stopWatch';

interface IProps {
  state: StopWatchState;
  lapNumber: number;
  onLap: (time: number) => void;
}

export default function Timer({ state, lapNumber, onLap }: IProps) {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    let intervalID: ReturnType<typeof setTimeout> | null;
    if (state === StopWatchState.RUNNING) {
      intervalID = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);
    }
    if (state === StopWatchState.INITIAL) {
      setTime(0);
    }
    if (intervalID) return () => clearInterval(intervalID);
  }, [state]);

  useEffect(() => {
    if (lapNumber !== 0) onLap(time);
  }, [lapNumber]);

  const { minutes, seconds, hundredthSec } = toStopWatchFormat(time);

  return (
    <div className='timer-container' data-testid='timer'>
      <span className='timer-number'>{minutes}</span>
      <span>:</span>
      <span className='timer-number'>{seconds}</span>
      <span>:</span>
      <span className='timer-number'>{hundredthSec}</span>
    </div>
  );
}
