import React from "react";

import StopWatch from "./StopWatch";
import {Page, Text, BlockStack, Link} from "@shopify/polaris";

import "./style.css";

export default function App() {
  return (
    <div id="app">
      <Page>
        <BlockStack gap="1000">
          <Text variant="heading3xl" as="h1">
            Stopwatch
          </Text>
          <StopWatch />
          <Text variant="bodyLg" as="p">
            Made by{" "}
            <Link monochrome url="https://wizhaa.com/">
              Will Zhang
            </Link>{" "}
            using Shopify's Polaris UI kit.
          </Text>
        </BlockStack>
      </Page>
    </div>
  );
}
