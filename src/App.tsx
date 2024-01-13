import React from "react";

import StopWatch from "./StopWatch";
import {Page, Text, BlockStack, Link} from "@shopify/polaris";
import {ChatMajor} from "@shopify/polaris-icons";

export default function App() {
  return (
    <Page
      narrowWidth
      title="Stopwatch"
      subtitle="For Shopify's 2024 Summer Frontend Internship"
      secondaryActions={[
        {
          content: "Connect",
          external: true,
          icon: ChatMajor,
          url: "https://www.linkedin.com/in/notwz/",
        },
      ]}
    >
      <BlockStack gap="1000">
        <StopWatch />
        <Text variant="bodyLg" as="p">
          Made by{" "}
          <Link monochrome url="https://www.linkedin.com/in/notwz/">
            Will Zhang
          </Link>{" "}
          using Shopify's Polaris UI kit.
        </Text>
      </BlockStack>
    </Page>
  );
}
