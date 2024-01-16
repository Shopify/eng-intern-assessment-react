import React from 'react';
import {
  Text,
  Layout,
  Card,
  Box,
  BlockStack,
  Badge,
  InlineGrid,
} from '@shopify/polaris';
import StopWatchLaps from './StopWatchLaps';
import { useStopWatch } from '../hooks/useStopWatch';
import { formatTime } from '../utils/format';
import StopWatchControls from './StopWatchControls';
import StopWatchImg from '../assets/StopWatch.png';
import StopWatchTime from './StopWatchTime';

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
      <Layout.Section variant="oneHalf">
        <Card padding="800">
          <InlineGrid columns={2}>
            <BlockStack gap="400">
              <StopWatchTime timeElapsed={timeElapsed} />
              <StopWatchControls
                stopwatchStatus={stopwatchStatus}
                startStopwatch={startStopwatch}
                stopStopwatch={stopStopwatch}
                resetStopwatch={resetStopwatch}
                recordLap={recordLap}
              />
              <Box data-testid="stopwatch-current-lap">
                <Badge size="large">
                  {'Current lap - ' + formatTime(currentLapTime)}
                </Badge>
              </Box>
            </BlockStack>
            <BlockStack inlineAlign="end">
              <img src={StopWatchImg} alt="Stop Watch Image" width={133.5} />
            </BlockStack>
          </InlineGrid>
        </Card>
      </Layout.Section>
      <Layout.Section variant="oneHalf">
        {laps.length > 1 && (
          <StopWatchLaps laps={laps} currentLap={currentLapTime} />
        )}
      </Layout.Section>
    </Layout>
  );
}
