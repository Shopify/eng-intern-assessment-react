import React from 'react';
import { formatTime } from './utils';

interface LapListProps {
  laps: number[];
  className?: string;
}

export default function LapList(props: LapListProps) {
  if (props.laps.length === 0) {
    return null;
  }

  return (
    <div className={props.className}>
      <h2>Laps</h2>
      <ul>
        {props.laps.map((lap) => (
          <li key={lap}>{formatTime(lap)}</li>
        ))}
      </ul>
    </div>
  );
}
