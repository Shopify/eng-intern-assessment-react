import {
  Bleed,
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  Divider,
  Icon,
  InlineStack,
  Text,
} from '@shopify/polaris';
import {
  FlagIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  ReplayIcon,
} from '@shopify/polaris-icons';
import React from 'react';
import { LapTable } from './LapTable';
import { useStopWatch } from './useStopWatch';
import { formatMillisAsTimestamp } from './utils';

export function StopWatch() {
  const { isRunning, elapsedTime, laps, start, stop, reset, recordLap } =
    useStopWatch();

  const mainButtonMarkup = isRunning ? (
    <Button icon={<Icon source={PauseCircleIcon} />} onClick={stop}>
      Stop
    </Button>
  ) : (
    <Button
      variant="primary"
      icon={<Icon source={PlayCircleIcon} />}
      onClick={start}
    >
      Start
    </Button>
  );

  return (
    <Card>
      <BlockStack gap="300">
        <Text as="h2" variant="headingSm">
          Stopwatch
        </Text>

        <Text as="h3" variant="heading3xl" numeric>
          {formatMillisAsTimestamp(elapsedTime)}
        </Text>

        <InlineStack>
          <ButtonGroup>
            {mainButtonMarkup}
            <Button
              variant="secondary"
              tone="critical"
              icon={<Icon source={ReplayIcon} />}
              onClick={reset}
            >
              Reset
            </Button>
            <Button
              variant="secondary"
              onClick={recordLap}
              icon={<Icon source={FlagIcon} />}
            >
              Lap
            </Button>
          </ButtonGroup>
        </InlineStack>

        {laps.length > 0 && (
          <Bleed marginBlockEnd="400" marginInline="400">
            <Divider />
            <LapTable laps={laps} />
          </Bleed>
        )}
      </BlockStack>
    </Card>
  );
}
