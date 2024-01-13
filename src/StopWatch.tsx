import React, { useCallback, useState } from 'react';
import Timer from './Timer';
import StopWatchButtons from './StopWatchButtons';
import LapsList from './LapsList';
import { StopWatchAction, StopWatchState } from './resources/stopWatch';
import { toStopWatchFormat } from './utils/time';
import { Lap } from './types';

export default function StopWatch() {
  const [laps, setLaps] = useState<Lap[]>([]);
  const [prevTime, setPrevTime] = useState<number>(0);
  const [lapNumber, setLapNumber] = useState<number>(0);
  const [state, setState] = useState<StopWatchState>(StopWatchState.INITIAL);

  const handleAction = useCallback(
    (event: StopWatchAction) => {
      switch (event) {
        case StopWatchAction.START:
        case StopWatchAction.RESUME: {
          setState(StopWatchState.RUNNING);
          break;
        }
        case StopWatchAction.STOP: {
          setState(StopWatchState.PAUSED);
          break;
        }
        case StopWatchAction.LAP: {
          setLapNumber((prevLapNumber) => prevLapNumber + 1);
          break;
        }
        case StopWatchAction.RESET: {
          setState(StopWatchState.INITIAL);
          setLapNumber(0);
          setPrevTime(0);
          setLaps([]);
          break;
        }
      }
    },
    [setState, setLapNumber, setPrevTime, setLaps]
  );

  const handleLap = (time: number) => {
    const lapTime = toStopWatchFormat(time - prevTime);
    const currLap: Lap = {
      lapNumber: lapNumber,
      lapTime: `${lapTime.minutes}:${lapTime.seconds}:${lapTime.hundredthSec}`,
    };
    setLaps((prevLap) => [currLap, ...prevLap]);
    setPrevTime(time);
  };

  return (
    <>
      <Timer lapNumber={lapNumber} state={state} onLap={handleLap} />
      <StopWatchButtons onButtonPress={handleAction} state={state} />
      {!!laps.length && <LapsList laps={laps} />}
    </>
  );
}
