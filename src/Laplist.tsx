import React from "react";
import "./styles/Lap.css";
import formatTime from "./FormatTime";
interface lapListProps {
  lap: number[];
}

export default function Laplist({ lap }: lapListProps) {
  return (
    <div className="lapList">
      {lap.map((lap, index) => (
        <div className="lap" key={index}>
          Lap {index + 1}: {formatTime(lap)}
        </div>
      ))}
    </div>
  );
}
