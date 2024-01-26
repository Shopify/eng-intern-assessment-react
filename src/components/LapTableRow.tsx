import React from "react";
import dateFormatter from "../utils/TimeFormatter";

interface LSTime {
  time: number;
  index: number;
}

interface LapTableRowProps {
  lap: number;
  lapTime: number;
  overallTime: number;
  lLapTime: LSTime;
  sLapTime: LSTime;
  displayLab: boolean;
}

/* Represents a row in the lap table for teh stopwatch. */
export default function LapTableRow({
  lap,
  lapTime,
  overallTime,
  lLapTime,
  sLapTime,
  displayLab,
}: LapTableRowProps) {
  return (
    <tr key={lap}>
      <td
        className={`lap-${
          displayLab &&
          (lap == lLapTime.index ? "l" : lap == sLapTime.index && "s")
        }`}
      >
        {(10 - lap > 0 && "0") + lap}
      </td>
      <td>{dateFormatter.formatLapTime(lapTime)}</td>
      <td className="overall-time">
        {dateFormatter.formatLapTime(overallTime)}
      </td>
    </tr>
  );
}
