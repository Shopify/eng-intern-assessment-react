import React from 'react';
import { Text, ButtonGroup, Layout, Button } from '@shopify/polaris';
import StopWatchLaps from './StopWatchLaps';
import { useStopWatch, StopwatchStatus } from '../useStopWatch';
import { formatTime } from '../utils';
import {
  PlayIcon,
  PauseCircleIcon,
  ResetIcon,
  FlagIcon,
} from '@shopify/polaris-icons';

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
        <div data-testid="stopwatch-control">
          <ButtonGroup>
            {stopwatchStatus === StopwatchStatus.Paused ? (
              <Button
                variant="primary"
                tone="success"
                onClick={startStopwatch}
                icon={PlayIcon}
              >
                Start
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={stopStopwatch}
                icon={PauseCircleIcon}
              >
                Stop
              </Button>
            )}
            <Button
              disabled={
                stopwatchStatus === StopwatchStatus.Paused ? true : false
              }
              onClick={recordLap}
              icon={FlagIcon}
            >
              Lap
            </Button>
            <Button
              disabled={
                stopwatchStatus === StopwatchStatus.Running ? true : false
              }
              variant="primary"
              tone="critical"
              icon={ResetIcon}
              onClick={resetStopwatch}
            >
              Reset
            </Button>
          </ButtonGroup>
        </div>
      </Layout.Section>
      <Layout.Section>
        {laps.length > 0 && (
          <StopWatchLaps laps={laps} currentLap={currentLapTime} />
        )}
      </Layout.Section>
    </Layout>
  );
}
