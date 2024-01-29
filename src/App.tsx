import React from "react";
import "@shopify/polaris/build/esm/styles.css";
import { AppProvider } from "@shopify/polaris";
import StopWatch from "./StopWatch";
import "./styles/output.css";

export default function App() {
  return (
    <AppProvider i18n={[]}>
      <div className="flex">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Shopify Stopwatch
        </h2>
        <StopWatch />
      </div>
    </AppProvider>
  );
}
