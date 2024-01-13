import React from "react";

import StopWatch from "./StopWatch";
import {Page, Text, BlockStack} from "@shopify/polaris";

export default function App() {
  return (
    <Page>
      <BlockStack gap="1000">
        <Text variant="heading3xl" as="h1">
          Stopwatch
        </Text>
        <StopWatch />
      </BlockStack>
    </Page>
  );
}
