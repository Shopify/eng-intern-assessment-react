import React from 'react';
import { Text, ButtonGroup, Layout, Button } from '@shopify/polaris';
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
          <Button onClick={startStopwatch}>Start</Button>
          <Button onClick={() => {}}>Stop</Button>
          <Button onClick={() => {}}>Lap</Button>
          <Button onClick={() => {}}>Rest</Button>
        </ButtonGroup>
      </Layout.Section>
      <Layout.Section>
        <StopWatchLaps />
      </Layout.Section>
    </Layout>
  );
}
