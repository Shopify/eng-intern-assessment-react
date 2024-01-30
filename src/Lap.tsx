import React from "react";
import {
  Badge,
  BlockStack,
  Divider,
  InlineStack,
  Text,
} from "@shopify/polaris";

interface LapProps {
  lapNumber: number;
  lapTime: string;
  fastestLap?: boolean;
  slowestLap?: boolean;
  lapLabel?: string;
  fastestLapLabel?: string;
  slowestLapLabel?: string;
}

const Lap: React.FC<LapProps> = ({
  lapNumber,
  lapTime,
  fastestLap = false,
  slowestLap = false,
  lapLabel = "Lap",
  fastestLapLabel = "Fastest",
  slowestLapLabel = "Slowest",
}) => {
  const lapElId = `lap-${lapNumber}`;
  return (
    <>
      <Divider />
      <InlineStack align="space-between">
        <InlineStack align="start" gap="300">
          <Text id={lapElId} as="span" variant="headingLg">
            {lapLabel} {lapNumber}
          </Text>
          {fastestLap && <Badge tone="success">{fastestLapLabel}</Badge>}
          {slowestLap && <Badge tone="critical">{slowestLapLabel}</Badge>}
        </InlineStack>
        <Text as="span" variant="headingLg" numeric>
          {lapTime}
        </Text>
      </InlineStack>
    </>
  );
};

export default Lap;
