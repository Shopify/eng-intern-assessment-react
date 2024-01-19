import { AppProvider, Page } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import React from 'react';
import { StopWatch } from './stopwatch/StopWatch';

export default function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <Page
        narrowWidth
        title="Stopwatch demo"
        subtitle="Shopify 2024 Internship Technical Challenge"
      >
        <StopWatch />
      </Page>
    </AppProvider>
  );
}
