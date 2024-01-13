import React from "react";
import { createRoot } from "react-dom/client";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Badge, Page } from "@shopify/polaris";
import { ExternalMinor } from "@shopify/polaris-icons";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <AppProvider i18n={enTranslations}>
    <Page
      narrowWidth
      title="Stop Watch"
      subtitle="Summer 2024 Frontend Internship"
      titleMetadata={<Badge tone="success">by Ashley Chiu</Badge>}
      secondaryActions={[
        {
          content: "Contact",
          external: true,
          icon: ExternalMinor,
          url: "https://www.linkedin.com/in/ashychiu",
        },
      ]}
    >
      <App />
    </Page>
  </AppProvider>
);
