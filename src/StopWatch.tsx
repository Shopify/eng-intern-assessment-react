import React, { useEffect, useState } from "react";
import { formatTime } from "./helper";

interface StopwatchProps {
  time: number;
}

const Stopwatch: React.FC<StopwatchProps> = ({ time }) => {
  return (
    <div>
      <h2>Stopwatch: {formatTime(time)}</h2>
    </div>
  );
};

export default Stopwatch;
