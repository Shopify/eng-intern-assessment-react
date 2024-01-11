import React from 'react';
import { formatTime } from './utils';

interface LapListProps {
  laps: number[];
}

export default function LapList({ laps }: LapListProps) {
  if (laps.length === 0) {
    return null;
  }

  return (
    <ul>
      {laps.map((lap) => (
        <li key={lap}>{formatTime(lap)}</li>
      ))}
    </ul>
  );
}
