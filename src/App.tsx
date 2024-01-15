import React from "react";
import StopWatch from "./StopWatch";
import { AppProvider, Page } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";

export default function App() {
  return (
    <Page title="Stop Watch Assessment - Nihal Patel">
      <StopWatch />
    </Page>
  );
}
