import { Layout } from '@shopify/polaris';
import React from 'react';
import StopWatchControl from './StopWatchControl';
import StopWatchTime from './StopWatchTime';
import StopWatchLaps from './StopWatchLaps';

export default function StopWatch() {
  return (
    <div>
      <Layout>
        <Layout.Section>
          <StopWatchTime />
        </Layout.Section>
        <Layout.Section>
          <StopWatchControl />
        </Layout.Section>
        <Layout.Section>
          <StopWatchLaps />
        </Layout.Section>
      </Layout>
    </div>
  );
}
