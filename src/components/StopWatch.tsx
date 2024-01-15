import React from 'react';
import { Text, ButtonGroup, Layout } from '@shopify/polaris';
import StopWatchButton from './StopWatchButton';
import StopWatchLaps from './StopWatchLaps';
import { useStopWatch } from '../useStopWatch';
import { formatTime } from '../utils';

export default function StopWatch() {
  const { timeElapsed, startStopwatch } = useStopWatch();

  return (
    <Layout>
      <Layout.Section>
        <Text variant="headingLg" as="h2">
          {formatTime(timeElapsed)}
        </Text>
      </Layout.Section>
      <Layout.Section>
        <ButtonGroup>
          <StopWatchButton text="Start" handleClick={startStopwatch} />
          <StopWatchButton text="Reset" handleClick={() => {}} />
          <StopWatchButton text="Lap" handleClick={() => {}} />
          <StopWatchButton text="Stop" handleClick={() => {}} />
        </ButtonGroup>
      </Layout.Section>
      <Layout.Section>
        <StopWatchLaps />
      </Layout.Section>
    </Layout>
  );
}
