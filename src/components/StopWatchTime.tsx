import React from 'react';
import { Text } from '@shopify/polaris';
import { formatTime } from '../utils/format';

type StopWatchTimeProps = {
  timeElapsed: number;
};

export default function StopWatchTime({ timeElapsed }: StopWatchTimeProps) {
  const formattedTime = formatTime(timeElapsed);
  const hoursMinutesSeconds = formattedTime.slice(0, -3);
  const milliseconds = formattedTime.slice(-3);

  return (
    <Text variant="heading3xl" as="h1">
      <div data-testid="stopwatch-time">
        {hoursMinutesSeconds}
        <span style={{ fontSize: '0.75em' }}>{milliseconds}</span>
      </div>
    </Text>
  );
}
