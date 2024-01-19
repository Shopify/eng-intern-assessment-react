import { IndexTable, Text } from '@shopify/polaris';
import React from 'react';
import { formatMillisAsTimestamp } from './utils';

interface LapTableProps {
  laps: number[];
}

/**
 * Renders a list of lap times into a IndexTable.
 */
export function LapTable(props: LapTableProps) {
  const rowMarkup = props.laps
    .map((lapTime, index) => {
      const previousLapTime = index === 0 ? 0 : props.laps[index - 1];
      const splitTime = lapTime - previousLapTime;
      return { position: index + 1, splitTime, totalTime: lapTime };
    })
    .reverse()
    .map(({ position, splitTime, totalTime }) => {
      return (
        <IndexTable.Row id={`${position}`} key={position} position={position}>
          <IndexTable.Cell>
            <Text as="span" numeric>
              {position}
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Text as="span" numeric>
              {formatMillisAsTimestamp(splitTime)}
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Text as="span" numeric>
              {formatMillisAsTimestamp(totalTime)}
            </Text>
          </IndexTable.Cell>
        </IndexTable.Row>
      );
    });

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
