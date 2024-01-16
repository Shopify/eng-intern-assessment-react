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
        <ButtonGroup>
          <div data-testid="stopwatch-control">
            {stopwatchStatus === StopwatchStatus.Paused ? (
              <Button variant="primary" tone="success" onClick={startStopwatch}>
                Start
              </Button>
            ) : (
              <Button variant="primary" onClick={stopStopwatch}>
                Stop
              </Button>
            )}
            <Button
              disabled={
                stopwatchStatus === StopwatchStatus.Paused ? true : false
              }
              onClick={recordLap}
            >
              Lap
            </Button>
            <Button variant="primary" tone="critical" onClick={resetStopwatch}>
              Reset
            </Button>
          </div>
        </ButtonGroup>
      </Layout.Section>
      <Layout.Section>
        {laps.length > 0 && (
          <StopWatchLaps laps={laps} currentLap={currentLapTime} />
        )}
      </Layout.Section>
    </Layout>
  );
}
