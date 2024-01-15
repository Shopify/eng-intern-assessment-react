import React from 'react';
import { Text, ButtonGroup, Layout, Button } from '@shopify/polaris';
import StopWatchLaps from './StopWatchLaps';
import { useStopWatch, StopwatchStatus } from '../useStopWatch';
import { formatTime } from '../utils';

export default function StopWatch() {
  const {
    timeElapsed,
    stopwatchStatus,
    startStopwatch,
    stopStopwatch,
    laps,
    recordLap,
  } = useStopWatch();

  return (
    <Layout>
      <Layout.Section>
        <Text variant="headingLg" as="h2">
          {formatTime(timeElapsed)}
        </Text>
      </Layout.Section>
      <Layout.Section>
        <ButtonGroup>
          {stopwatchStatus === StopwatchStatus.Paused ? (
            <Button variant="primary" tone="success" onClick={startStopwatch}>
              Start
            </Button>
          ) : (
            <Button variant="primary" onClick={stopStopwatch}>
              Stop
            </Button>
          )}
          <Button onClick={recordLap}>Lap</Button>
          <Button onClick={() => {}}>Reset</Button>
        </ButtonGroup>
      </Layout.Section>
      <Layout.Section>
        {laps.length > 0 && <StopWatchLaps laps={laps} />}
      </Layout.Section>
    </Layout>
  );
}
