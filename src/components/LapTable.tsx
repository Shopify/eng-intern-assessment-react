import React from "react";
import { formatTime } from "../utils/stopwatchUtils";

export type Lap = {
  number: number;
  split: number;
  totalTime: number;
};

type Props = {
  laps: Lap[];
  longestLap: Lap | null;
  shortestLap: Lap | null;
};

export default function App(props: Props) {
  const { laps, longestLap, shortestLap } = props;

  return (
    <div className="lap-container">
      <table className="lap-table">
        <thead>
          <tr>
            <th>Lap No.</th>
            <th>Split</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody data-testid="lap-list">
          {laps.map((lap) => (
            <tr
              key={lap.number}
              className={`lap-item
              ${lap === longestLap && "longest-lap"}
              ${lap === shortestLap && "shortest-lap"}`}
              data-testid={`lap-item-${lap.number}`}
            >
              <td>{lap.number}</td>
              <td>{formatTime(lap.split)}</td>
              <td>{formatTime(lap.totalTime)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
