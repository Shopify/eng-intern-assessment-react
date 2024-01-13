import React, {useCallback, useState} from "react";

import {Card, Text, BlockStack, DataTable} from "@shopify/polaris";

type LapsProps = {
  laps: Array<Array<any>>;
};
export default function Laps({laps}: LapsProps) {
  return (
    <Card>
      <Text variant="headingLg" as="h2">
        Laps
      </Text>
      <BlockStack gap="1000">
        <DataTable
          columnContentTypes={["numeric", "text", "text"]}
          headings={["Lap Number", "Lap Time", "Total Time Elapsed"]}
          rows={laps}
          hasZebraStripingOnData
        />
      </BlockStack>
    </Card>
  );
}
