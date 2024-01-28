import React from 'react';
import '@shopify/polaris/build/esm/styles.css';
import {
  AppProvider,
  Card,
  Page,
} from '@shopify/polaris';
import StopWatch from './StopWatch'

export default function App() {
  return(
    <AppProvider i18n={{}}>
      <Page
        narrowWidth
        title="Simple Stopwatch">
        <Card>
          <StopWatch />
        </Card>
      </Page>
    </AppProvider>
  )
}