import React, { useState } from 'react';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
  const [elapsed, setElapsed] = useState<number>(0);

  return (
    <div>
      <StopWatchButton elapsed={elapsed} setElapsed={setElapsed} />
    </div>
  );
}
