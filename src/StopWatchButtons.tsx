import React, { useEffect, useState } from 'react';
import { StopWatchAction, StopWatchState } from './resources/stopWatch';

interface IProps {
  onButtonPress: (action: StopWatchAction) => void;
  state: StopWatchState;
}

interface IStopWatchButton {
  label: string;
  action: StopWatchAction;
}

export default function StopWatchButtons({ onButtonPress, state }: IProps) {
  const [leftButton, setLeftButton] = useState<IStopWatchButton>();
  const [rightButton, setRightButton] = useState<IStopWatchButton>();

  useEffect(() => {
    switch (state) {
      case StopWatchState.INITIAL:
        setLeftButton({ label: 'Lap', action: StopWatchAction.LAP });
        setRightButton({ label: 'Start', action: StopWatchAction.START });
        break;
      case StopWatchState.RUNNING:
        setLeftButton({ label: 'Lap', action: StopWatchAction.LAP });
        setRightButton({ label: 'Stop', action: StopWatchAction.STOP });
        break;
      case StopWatchState.PAUSED:
        setLeftButton({ label: 'Reset', action: StopWatchAction.RESET });
        setRightButton({ label: 'Resume', action: StopWatchAction.RESUME });
        break;
    }
  }, [state]);

  return (
    <div>
      <button
        disabled={state === StopWatchState.INITIAL}
        onClick={() => onButtonPress(leftButton.action)}
      >
        {leftButton?.label}
      </button>
      <button onClick={() => onButtonPress(rightButton.action)}>
        {rightButton?.label}
      </button>
    </div>
  );
}
