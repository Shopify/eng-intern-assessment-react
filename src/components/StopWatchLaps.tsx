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
              // The lap number is calculated in reverse order to indicate the
              // most recent lap number.
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
