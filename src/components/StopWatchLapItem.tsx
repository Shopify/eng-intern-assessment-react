import React from 'react';
import { Text, Box, Divider, InlineGrid } from '@shopify/polaris';
import { formatTime } from '../utils/format';

type StopWatchLapItemProps = {
  lapTime: number;
  lapNumber: number;
};

const StopWatchLapItem = React.memo(
  ({ lapTime, lapNumber }: StopWatchLapItemProps) => {
    return (
      <>
        <Box padding="200">
          <InlineGrid data-testid="stopwatch-current-lap" columns={2}>
            <Text variant="bodyLg" as="p">
              Lap {lapNumber}
            </Text>
            <Text variant="bodyLg" as="p" alignment="end">
              {formatTime(lapTime)}
            </Text>
          </InlineGrid>
        </Box>
        {lapNumber > 1 && <Divider />}
      </>
    );
  }
);

export default StopWatchLapItem;
