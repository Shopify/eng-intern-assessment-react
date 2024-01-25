import React from "react";
import { formatTime } from "../../utils/formatTime";
import "./LapList.css";
type LapListProps = {
  laps: number[];
};
export function LapList({ laps = [] }: LapListProps) {
  return (
    <div data-testid="lap-list" className="lap">
      {laps.length > 0 && (
        <ul className="lap-list">
          {laps.map((currLap, i) => (
            <li data-testid={`lap-item-${i + 1}`} className="lap-item" key={i}>
              <div>Lap {i + 1}</div>
              <div>{formatTime(currLap)}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
