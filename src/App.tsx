import { AppProvider, Badge, Page } from '@shopify/polaris';
import { ExternalIcon } from '@shopify/polaris-icons';
import '@shopify/polaris/build/esm/styles.css';
import React from 'react';
import { StopWatch } from './stopwatch/StopWatch';

export default function App() {
  return (
    <AppProvider i18n={{}}>
      <Page
        narrowWidth
        title="Stopwatch demo"
        titleMetadata={<Badge>by Benjamin Sengupta</Badge>}
        subtitle="Shopify 2024 Internship Technical Challenge"
        secondaryActions={[
          {
            content: 'LinkedIn',
            url: 'https://www.linkedin.com/in/bensengupta/',
            icon: ExternalIcon,
            external: true,
          },
          {
            content: 'GitHub',
            url: 'https://github.com/bensengupta',
            icon: ExternalIcon,
            external: true,
          },
        ]}
      >
        <StopWatch />
      </Page>
    </AppProvider>
  );
}
