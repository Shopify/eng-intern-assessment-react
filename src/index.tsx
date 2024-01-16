import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <AppProvider i18n={enTranslations}>
        <App />
    </AppProvider>
);
