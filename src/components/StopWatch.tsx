import React from 'react';
import { Text, Layout } from '@shopify/polaris';
import StopWatchLaps from './StopWatchLaps';
import { useStopWatch } from '../useStopWatch';
import { formatTime } from '../utils';
import StopWatchControls from './StopWatchControls';

export default function StopWatch() {
  const {
    timeElapsed,
    stopwatchStatus,
    startStopwatch,
    stopStopwatch,
    resetStopwatch,
    laps,
    recordLap,
    currentLapTime,
  } = useStopWatch();

  return (
    <Layout>
      <Layout.Section>
        <Text variant="headingLg" as="h2">
          <div data-testid="stopwatch-time">{formatTime(timeElapsed)}</div>
        </Text>
      </Layout.Section>
      <Layout.Section>
        <StopWatchControls
          stopwatchStatus={stopwatchStatus}
          startStopwatch={startStopwatch}
          stopStopwatch={stopStopwatch}
          resetStopwatch={resetStopwatch}
          recordLap={recordLap}
        />
      </Layout.Section>
      <Layout.Section>
        {laps.length > 0 && (
          <StopWatchLaps laps={laps} currentLap={currentLapTime} />
        )}
      </Layout.Section>
    </Layout>
  );
}
