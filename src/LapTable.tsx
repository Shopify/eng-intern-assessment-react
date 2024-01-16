import React, { useContext } from "react";
import { formatTime } from "./StopWatch";
// Context
import LapContext from "./Context/LapContext";
// Styles
import "./Styles/LapTable.css";

export default function LapTable() {
  const { lapTimes, counter } = useContext(LapContext);

  return (
    <div
      className="laps"
      style={{ display: lapTimes.length ? "block" : "none" }}
    >
      <ul>
        {lapTimes.map((item, index) => (
          <li key={index}>
            <span>{`Lap ${counter + index + 1}`}</span>
            <span>{formatTime(item)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
