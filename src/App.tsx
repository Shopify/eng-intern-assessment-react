import {
  BlockStack,
  Button,
  Card,
  Icon,
  InlineStack,
  Page,
  Text,
} from "@shopify/polaris";
import React from "react";
import StopWatch from "./StopWatch";
import { ClockMajor } from "@shopify/polaris-icons";

export default function App() {
  return (
    <Page>
      <BlockStack gap="300">
        <Text as="h1" variant="headingXl">
          Andrew's Stopwatch
        </Text>
        <StopWatch></StopWatch>
      </BlockStack>
    </Page>
  );
}
