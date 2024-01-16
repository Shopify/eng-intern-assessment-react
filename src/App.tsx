import React from "react";
import StopWatch from "./StopWatch";
import "@shopify/polaris/build/esm/styles.css";
import en from "@shopify/polaris/locales/en.json";
import { AppProvider, Badge, Page } from "@shopify/polaris";

export default function App() {
  return (
    <div>
      <AppProvider i18n={en}>
        <Page narrowWidth title={`Yahya Osman's Stop Watch`}>
          <StopWatch />
        </Page>
      </AppProvider>
    </div>
  );
}
