import React from 'react';
import { Text, Box, Divider } from '@shopify/polaris';
import { formatTime } from '../utils';

type StopWatchLapItemProps = {
  lapTime: number;
  lapNumber: number;
};

const StopWatchLapItem = React.memo(
  ({ lapTime, lapNumber }: StopWatchLapItemProps) => {
    return (
      <>
        <Divider />
        <Box>
          <Text as="p">
            Lap {lapNumber}: {formatTime(lapTime)}
          </Text>
        </Box>
      </>
    );
  }
);

export default StopWatchLapItem;
