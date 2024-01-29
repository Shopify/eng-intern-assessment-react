import React from "react";
import "@shopify/polaris/build/esm/styles.css";
import { AppProvider } from "@shopify/polaris";
import StopWatch from "./StopWatch";

export default function App() {
  return (
    <AppProvider i18n={[]}>
      <StopWatch />
    </AppProvider>
  );
}
