import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { toStopWatchFormat } from './utils/time';
import { StopWatchAction, StopWatchState } from './resources/stopWatch';

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

  return <div>{toStopWatchFormat(time)}</div>;
}
