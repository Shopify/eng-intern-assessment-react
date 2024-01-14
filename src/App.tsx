import React from "react";
import StopWatch from "./StopWatch";
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";

export default function App() {
  return (
    <AppProvider i18n={undefined}>
      <StopWatch />
    </AppProvider>
  );
}
