import React from 'react';
import { Text, Card, Divider, Box } from '@shopify/polaris';
import { formatTime } from '../utils';

type StopWatchLapsProps = {
  laps: number[];
};

export default function StopWatchLaps({ laps }: StopWatchLapsProps) {
  return (
    <Card>
      {laps.map((lap, index) => (
        <Box key={index}>
          {index > 0 && <Divider />}
          <Text as="p">
            Lap {index + 1}: {formatTime(lap)}
          </Text>
        </Box>
      ))}
    </Card>
  );
}
