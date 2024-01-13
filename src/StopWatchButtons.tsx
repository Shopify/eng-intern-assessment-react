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
  const [buttons, setButtons] = useState<IStopWatchButton[]>([]);

  useEffect(() => {
    switch (state) {
      case StopWatchState.INITIAL:
        setButtons([{ label: 'Start', action: StopWatchAction.START }]);
        break;
      case StopWatchState.RUNNING:
        setButtons([
          { label: 'Lap', action: StopWatchAction.LAP },
          { label: 'Stop', action: StopWatchAction.STOP },
          { label: 'Reset', action: StopWatchAction.RESET },
        ]);
        break;
      case StopWatchState.PAUSED:
        setButtons([
          { label: 'Resume', action: StopWatchAction.RESUME },
          { label: 'Reset', action: StopWatchAction.RESET },
        ]);
        break;
    }
  }, [state]);

  return (
    <div className='stopwatch-btn-container'>
      {buttons.map((button) => (
        <button
          className='stopwatch-btn'
          key={button.label}
          onClick={() => onButtonPress(button.action)}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
}
