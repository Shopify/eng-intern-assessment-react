import React from 'react';
import Lap from './Lap';
import { Lap as LapData } from './Types';

type Props = {
  laps: LapData[];
};

export default function LapList({ laps }: Props) {
  return (
    <div>
      {laps.map((lap, index) => (
        <Lap key={index} lap={lap} />
      ))}
    </div>
  );
}
