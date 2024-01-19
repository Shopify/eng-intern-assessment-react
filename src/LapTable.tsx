import React, { useContext, useEffect, useRef } from "react";
import { formatTime } from "./StopWatch";
// Context
import LapContext from "./Context/LapContext";
// Styles
import "./Styles/LapTable.css";

export default function LapTable() {
  const { lapTimes } = useContext(LapContext);
  const lapsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Used to scroll to the bottom when new lap added
    lapsContainerRef.current.scrollTop = lapsContainerRef.current.scrollHeight;
  }, [lapTimes]);

  return (
    <div className={lapTimes.length ? "lapTableContainer" : "empty"}>
      <h3>
        <span>Lap</span>
        <span>Time</span>
      </h3>
      <div className="laps" style={{ display: "block" }} ref={lapsContainerRef}>
        <ul>
          {lapTimes.map((item, index) => (
            <li key={index}>
              <span>{`Lap ${index + 1}`}</span>
              <span>
                {index === 0
                  ? formatTime(item)
                  : formatTime(item - lapTimes[index - 1])}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
