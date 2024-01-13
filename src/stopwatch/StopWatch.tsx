import React, { useState } from 'react';
import Timer from './Timer';
import StopWatchButtons from './StopWatchButtons';
import LapsList from './LapsList';
import { StopWatchState } from './resources/stopWatch';
import { toStopWatchFormat } from '../utils/time';
import { Lap } from './types';
import { useHandleStopWatchAction } from './hooks/useHandleAction';

export default function StopWatch() {
  const [laps, setLaps] = useState<Lap[]>([]);
  const [prevTime, setPrevTime] = useState<number>(0);
  const [lapNumber, setLapNumber] = useState<number>(0);
  const [state, setState] = useState<StopWatchState>(StopWatchState.INITIAL);

  const { handleAction } = useHandleStopWatchAction(
    setState,
    setLapNumber,
    setPrevTime,
    setLaps
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
