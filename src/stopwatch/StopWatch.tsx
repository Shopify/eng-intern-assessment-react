import {
  Bleed,
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  Divider,
  Icon,
  IndexTable,
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
import { useStopWatch } from './useStopWatch';

export default function StopWatch() {
  const {
    isRunning,
    elapsedTime: timeElapsed,
    laps,
    start,
    stop,
    reset,
    recordLap,
  } = useStopWatch();

  return (
    <Card>
      <BlockStack gap="300">
        <Text as="h2" variant="headingSm">
          Stopwatch
        </Text>

        <Text as="h3" variant="heading3xl" numeric>
          {formatMillisToTime(timeElapsed)}
        </Text>

        <InlineStack>
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
              Record lap
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

interface LapTableProps {
  laps: number[];
}

function LapTable(props: LapTableProps) {
  const rowMarkup = props.laps
    .map((lapTime, index) => {
      const previousLapTime = index === 0 ? 0 : props.laps[index - 1];
      const splitTime = lapTime - previousLapTime;

      return (
        <IndexTable.Row id={`${index}`} key={index} position={index}>
          <IndexTable.Cell>
            <Text variant="bodyMd" as="span">
              {index + 1}
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Text variant="bodyMd" as="span" numeric>
              {formatMillisToTime(splitTime)}
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Text variant="bodyMd" as="span" numeric>
              {formatMillisToTime(lapTime)}
            </Text>
          </IndexTable.Cell>
        </IndexTable.Row>
      );
    })
    .reverse();

  return (
    <IndexTable
      resourceName={{ singular: 'lap', plural: 'laps' }}
      headings={[{ title: 'Lap' }, { title: 'Split' }, { title: 'Total Time' }]}
      itemCount={props.laps.length}
      selectable={false}
    >
      {rowMarkup}
    </IndexTable>
  );
}

function formatMillisToTime(millis: number) {
  const date = new Date(millis);
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const secondsStr = date.getSeconds().toString().padStart(2, '0');
  const milliseconds = Math.floor(date.getMilliseconds() / 10)
    .toString()
    .padStart(2, '0');

  return `${minutes}:${secondsStr}.${milliseconds}`;
}
