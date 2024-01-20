// component for rendering the laps list

import React from "react";
import "./LapsList.css";

type LapsListProps = {
  laps: string[];
};

export default function LapsList({ laps }: LapsListProps) {
  return (
    <ul data-testid="lap-list" className="lap-list">
      {laps && // renders the laps list if there are any laps
        laps.map((lap: string, index: number) => {
          const lapNumber: number = laps.length - index;

          return (
            <li key={index} className="lap-item">
              <span>{`Lap ${lapNumber}`}</span>
              <span>{lap}</span>
            </li>
          );
        })}
    </ul>
  );
}
