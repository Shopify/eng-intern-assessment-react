import React from "react";
import { createRoot } from "react-dom/client";
import "@shopify/polaris/build/esm/styles.css";
import "./styles.css";
import App from "./App";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Page } from "@shopify/polaris";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <AppProvider i18n={enTranslations}>
    <Page>
      <App />
    </Page>
  </AppProvider>
);
