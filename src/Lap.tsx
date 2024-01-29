import React from 'react'
import {
  Badge,
  Divider,
  InlineStack,
  Text,
} from '@shopify/polaris';

interface LapProps {
  lapNumber: number;
  lapTime: string;
  fastestLap?: boolean;
  slowestLap?: boolean;
}

const Lap: React.FC<LapProps> = ({ lapNumber, lapTime, fastestLap=false, slowestLap=false }) => {

  return (
    <>
      <Divider />
      <InlineStack align='space-between'>
        <InlineStack align='start' gap='300'>
          <Text as='span' variant='headingLg'>Lap {lapNumber}</Text>
          {fastestLap && <Badge tone='success'>Fastest</Badge>}
          {slowestLap && <Badge tone='critical'>Slowest</Badge>}
        </InlineStack>
        <Text as='span' variant='headingLg' numeric={true}>{lapTime}</Text>
      </InlineStack>
    </>
  )
}

export default Lap;