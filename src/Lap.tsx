import "./styles/Lap.css";

import React from "react";

export default function Lap({
  lapElapsed,
  lapIndex,
  isBestTime = false,
  isWorstTime = false,
}: {
  lapElapsed: string;
  lapIndex: number;
  isBestTime?: boolean;
  isWorstTime?: boolean;
}) {
  return (
    <>
      <div
        className={`lap ${isBestTime && "bestTime"} ${
          isWorstTime && "worstTime"
        }`}
      >
        <p>{"Lap " + lapIndex}</p>
        <p className="lapTime">{lapElapsed}</p>
      </div>
      <hr />
    </>
  );
}
