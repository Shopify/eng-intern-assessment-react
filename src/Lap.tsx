import "./styles/Lap.css";

import React from "react";

export default function Lap({
  lapElapsed,
  lapIndex,
  isBestLap = false,
  isWorstLap = false,
}: {
  lapElapsed: string;
  lapIndex: number;
  isBestLap?: boolean;
  isWorstLap?: boolean;
}) {
  return (
    <>
      <div
        className={`lap ${isBestLap && "bestTime"} ${
          isWorstLap && "worstTime"
        }`}
      >
        <p>{"Lap " + lapIndex}</p>
        <p className="lapTime">{lapElapsed}</p>
      </div>
      <hr />
    </>
  );
}
