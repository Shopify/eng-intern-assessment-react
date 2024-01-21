import React, { useState } from 'react';
import StopWatchButton from './StopWatchButton';
import './Style.css';

export default function StopWatch() {
  const [elapsed, setElapsed] = useState<number>(0);

  return (
    <div className="stopwatch-container">
      <div className="buttons-container">
        <StopWatchButton elapsed={elapsed} setElapsed={setElapsed} />
      </div>
      <div className="lap-times">
        
      </div>
    </div>
  );
}
