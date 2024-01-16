import React from "react";
import formatTime from "./FormatTime";
interface lapListProps {
  lap: number[];
}

export default function Laplist({ lap }: lapListProps) {
  return (
    <div data-testid="lap-list" className="lapList">
      {lap.map((lap, index) => (
        <div data-testid="lap" className="lap" key={index}>
          Lap {index + 1}: {formatTime(lap)}
        </div>
      ))}
    </div>
  );
}
