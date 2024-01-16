import React from 'react';
import { Page } from '@shopify/polaris';
import { ExternalIcon } from '@shopify/polaris-icons';
import StopWatch from './components/StopWatch';

export default function App() {
  return (
    <Page
      narrowWidth
      title="Stop Watch App"
      subtitle="Shopify Frontend Engineering Challenge Summer 2024"
      secondaryActions={[
        {
          content: 'By Jared Drueco',
          external: true,
          icon: ExternalIcon,
          url: 'https://www.jareddrueco.com/',
        },
      ]}
    >
      <StopWatch />
    </Page>
  );
}
