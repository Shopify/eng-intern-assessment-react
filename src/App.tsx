import { AppProvider, Page } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import React from 'react';
import StopWatch from './StopWatch';

export default function App() {
  return (
    <AppProvider i18n={{}}>
      <Page>
        <StopWatch />
      </Page>
    </AppProvider>
  );
}
