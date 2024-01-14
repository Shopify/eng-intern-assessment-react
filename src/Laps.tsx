import React, {useState} from "react";

import {
  Card,
  Text,
  BlockStack,
  DataTable,
  Collapsible,
  Button,
} from "@shopify/polaris";

type LapsProps = {
  laps: Array<Array<any>>;
};
export default function Laps({laps}: LapsProps) {
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <Text variant="headingLg" as="h2">
        Laps
      </Text>
      <BlockStack gap="1000">
        {laps.length > 0 && (
          <DataTable
            columnContentTypes={["numeric", "text", "text"]}
            headings={["Lap Number", "Lap Time", "Total Time Elapsed"]}
            rows={laps}
            hasZebraStripingOnData
          />
        )}
        <div></div>
        <Button onClick={() => setOpen((open) => !open)}>
          Display Raw Laps for Testing
        </Button>
        <Collapsible open={open} id="laps">
          <div data-testid="lap-list">
            {laps.length == 0 && "No laps yet."}
            {laps.map((lap, i) => (
              <div key={i}>
                {i} | {lap[1]}
              </div>
            ))}
          </div>
        </Collapsible>
      </BlockStack>
    </Card>
  );
}
