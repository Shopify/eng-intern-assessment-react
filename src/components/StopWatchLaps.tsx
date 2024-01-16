import React from 'react';
import { Text, Card, Box } from '@shopify/polaris';
import LapItem from './StopWatchLapItem';
import { formatTime } from '../utils';

type StopWatchLapsProps = {
  laps: number[];
  currentLap: number;
};

export default function StopWatchLaps({
  laps,
  currentLap,
}: StopWatchLapsProps) {
  return (
    <Card>
      <Box data-testid="stopwatch-current-lap">
        <Text as="p">Current Lap: {formatTime(currentLap)}</Text>
      </Box>
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
