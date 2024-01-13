import React, { Dispatch, SetStateAction, useState } from 'react';
import { hundredthSecsToMins, hundredthSecsToSecs } from './utils/time';

interface IProps {
  setLaps: Dispatch<SetStateAction<string[]>>;
  isRunning: boolean;
}

export default function Timer({ setLaps, isRunning }: IProps) {
  const [time, setTime] = useState<number>(0);
  const [prevTime, setPrevTime] = useState<number>(0);

  const minutes = hundredthSecsToMins(time).toString().padStart(2, '0');
  const seconds = (hundredthSecsToSecs(time) % 60).toString().padStart(2, '0');
  const hundredthSec = (time % 100).toString().toString().padStart(2, '0');

  return <div>{`${minutes}:${seconds}:${hundredthSec}`}</div>;
}
