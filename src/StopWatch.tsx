import React, { useState } from 'react';
import Timer from './Timer';
import StopWatchButtons from './StopWatchButtons';
import LapsList from './LapsList';

export default function StopWatch() {
  const [laps, setLaps] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  return (
    <div>
      <Timer setLaps={setLaps} isRunning={isRunning} />
      <StopWatchButtons />
      <LapsList laps={laps} />
    </div>
  );
}
