import React from "react";
import "@shopify/polaris/build/esm/styles.css";
import { AppProvider } from "@shopify/polaris";
import StopWatch from "./StopWatch";
import enTranslations from '@shopify/polaris/locales/en.json';

export default function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <StopWatch />
    </AppProvider>
  );
}
