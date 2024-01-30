import React from 'react';
import { Lap as LapData } from './Types';
import { formatTime } from './utils';

type Props = {
  lap: LapData;
};

export default function Lap({ lap }: Props) {
  const { time, lapNumber } = lap;
  const { hours, minutes, seconds, milliseconds } = time;
  return (
    <div className='text-slate-950'>
      Lap {lapNumber} - {formatTime(hours, minutes, seconds, milliseconds)}
    </div>
  );
}
