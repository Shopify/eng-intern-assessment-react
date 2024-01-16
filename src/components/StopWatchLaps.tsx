import React from 'react';
import { Card } from '@shopify/polaris';
import LapItem from './StopWatchLapItem';

type StopWatchLapsProps = {
  laps: number[];
  currentLap: number;
};

export default function StopWatchLaps({ laps }: StopWatchLapsProps) {
  return (
    <Card>
      <div data-testid="stopwatch-laps">
        {laps.map(
          (lap, index) =>
            lap !== 0 && (
              <LapItem
                key={index}
                lapTime={lap}
                lapNumber={laps.length - index - 1}
              />
            )
        )}
      </div>
    </Card>
  );
}
