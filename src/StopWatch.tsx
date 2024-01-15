import React, { useState } from "react";

import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  /* This will represent whether or not our stopwatch is active */
  const [timer, setTimer] = useState(false);

  return (
    <div>
      <p>StopWatch</p>
      <StopWatchButton active={timer} timerHandler={setTimer}/>
    </div>
  );
}
