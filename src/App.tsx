import React from "react";
import StopWatch from "./StopWatch";
import { BlockStack, Card, LegacyCard, Page } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";

export default function App() {
  return (
    <Page title="Stop Watch Assessment - Nihal Patel">
      {/* <LegacyCard title="." sectioned>
        <StopWatch />
      </LegacyCard> */}
      <Card padding="1000">
        <StopWatch />
      </Card>

      {/* </BlockStack> */}
    </Page>
  );
}
