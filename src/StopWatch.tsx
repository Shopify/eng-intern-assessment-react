import {
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  Icon,
  InlineStack,
  Text,
} from '@shopify/polaris';
import { PauseCircleIcon, PlayCircleIcon } from '@shopify/polaris-icons';
import React from 'react';
import { formatMillisToTime, useStopWatch } from './stopwatch/stopwatch';

export default function StopWatch() {
  const { isRunning, timeElapsed, laps, start, stop, reset, recordLap } =
    useStopWatch();

  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Stopwatch
        </Text>
        <Text as="h3" variant="heading3xl" numeric>
          {formatMillisToTime(timeElapsed)}
        </Text>
        <ul>
          {laps.map((lap, i) => (
            <li key={i}>{formatMillisToTime(lap)}</li>
          ))}
        </ul>

        <InlineStack align="start">
          <ButtonGroup>
            {isRunning ? (
              <Button icon={<Icon source={PauseCircleIcon} />} onClick={stop}>
                Pause
              </Button>
            ) : (
              <Button
                variant="primary"
                icon={<Icon source={PlayCircleIcon} />}
                onClick={start}
              >
                Start
              </Button>
            )}
            <Button variant="primary" tone="critical" onClick={reset}>
              Reset
            </Button>
            <Button onClick={recordLap}>Record lap</Button>
          </ButtonGroup>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}
