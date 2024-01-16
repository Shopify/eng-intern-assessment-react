import { Card, Page } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import React from "react";
import StopWatch from "./StopWatch";

export default function App() {
  return (
    <Page title="Stop Watch Assessment - Nihal Patel">
      <Card padding="1000">
        <StopWatch />
      </Card>
    </Page>
  );
}
