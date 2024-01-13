import React from "react";
import { formatTime } from "./utils";
import { BlockStack, Card, List, Text } from "@shopify/polaris";

interface LapRecordsProps {
  lapTimes: Array<number>;
}

export default function LapRecords(props: LapRecordsProps) {
  const { lapTimes } = props;

  return (
    <div style={{ marginTop: "2rem" }}>
      <Card background="bg-surface-secondary">
        <BlockStack gap="200">
          <Text variant="headingLg" as="h5">
            Lap Records
          </Text>
          <List type="number">
            <div data-testid="lap-list">
              {lapTimes.map((lapTime, index) => (
                <div
                  key={`${index}-${lapTime}`}
                  data-testid={`lap-time-${index}`}
                >
                  <List.Item>{formatTime(lapTime)}</List.Item>
                </div>
              ))}
            </div>
          </List>
        </BlockStack>
      </Card>
    </div>
  );
}
