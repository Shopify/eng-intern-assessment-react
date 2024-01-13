import React from "react";
import { formatTime } from "./utils";
import { BlockStack, Card, List, Text } from "@shopify/polaris";

export interface ILapRecordsProps {
  lapTimes: Array<number>;
}

export default function LapRecords(props: ILapRecordsProps) {
  const { lapTimes } = props;

  return (
    <div style={{ marginTop: "2rem" }}>
      <Card background="bg-surface-secondary">
        <BlockStack gap="200">
          <Text variant="headingXl" as="h3">
            Lap Records
          </Text>
          <List type="number">
            {lapTimes.map((lapTime, index) => (
              <div key={`${index}-${lapTime}`}>
                <List.Item>{formatTime(lapTime)}</List.Item>
              </div>
            ))}
          </List>
        </BlockStack>
      </Card>
    </div>
  );
}
