import React from 'react';
import { ButtonGroup, Button } from '@shopify/polaris';
import { StopwatchStatus } from '../useStopWatch';
import {
  PlayIcon,
  PauseCircleIcon,
  ResetIcon,
  FlagIcon,
} from '@shopify/polaris-icons';

type StopWatchButtonControlProps = {
  stopwatchStatus: StopwatchStatus;
  startStopwatch: () => void;
  stopStopwatch: () => void;
  resetStopwatch: () => void;
  recordLap: () => void;
};

export default function StopWatchControls({
  stopwatchStatus,
  startStopwatch,
  stopStopwatch,
  resetStopwatch,
  recordLap,
}: StopWatchButtonControlProps) {
  const isPausedOrInitial =
    stopwatchStatus === StopwatchStatus.Paused ||
    stopwatchStatus === StopwatchStatus.Initial;

  return (
    <ButtonGroup>
      {isPausedOrInitial ? (
        <Button
          variant="primary"
          tone="success"
          onClick={startStopwatch}
          icon={PlayIcon}
        >
          Start
        </Button>
      ) : (
        <Button
          variant="primary"
          onClick={stopStopwatch}
          icon={PauseCircleIcon}
        >
          Stop
        </Button>
      )}
      <Button disabled={isPausedOrInitial} onClick={recordLap} icon={FlagIcon}>
        Lap
      </Button>
      <Button
        disabled={stopwatchStatus === StopwatchStatus.Initial}
        variant="primary"
        tone="critical"
        icon={ResetIcon}
        onClick={resetStopwatch}
      >
        Reset
      </Button>
    </ButtonGroup>
  );
}
