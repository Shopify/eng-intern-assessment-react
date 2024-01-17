import React, { useContext } from "react";
import { formatTime } from "./StopWatch";
// Context
import LapContext from "./Context/LapContext";
// Styles
import "./Styles/LapTable.css";

export default function LapTable() {
  const { lapTimes } = useContext(LapContext);

  return (
    <div className="lapTableContainer">
      <h1>Lap Times</h1>
      <h3>
        <span>Lap</span>
        <span>Time</span>
      </h3>
      <div className="laps" style={{ display: "block" }}>
        <ul>
          {lapTimes.map((item, index) => (
            <li key={index}>
              <span>{`Lap ${index + 1}`}</span>
              <span>{formatTime(item)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
