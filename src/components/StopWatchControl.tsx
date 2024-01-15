import React from 'react';
import StopWatchButton from './StopWatchButton';
import { ButtonGroup } from '@shopify/polaris';

export default function StopWatchControl() {
  return (
    <ButtonGroup>
      <StopWatchButton text="Start" />
      <StopWatchButton text="Reset" />
      <StopWatchButton text="Lap" />
      <StopWatchButton text="Stop" />
    </ButtonGroup>
  );
}
