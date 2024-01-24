import React from "react";
import dateFormatter from "../utils/TimeFormatter";

interface LapTime {
  lap: number;
  lap_time: number;
  overall_time: number;
}

interface LSTime {
  time: number;
  index: number;
}

interface LapTableProps {
  lapData: LapTime[];
  lLapTime: LSTime;
  sLapTime: LSTime;
}

export default function LapTable({
  lapData,
  lLapTime,
  sLapTime,
}: LapTableProps) {
  return (
    <div className="lap-table-container">
      {lapData.length > 0 && (
        <table className="lap-table">
          <thead>
            <tr>
              <th>Lap</th>
              <th>Lap Times</th>
              <th>Overall Time</th>
            </tr>
          </thead>
          <tbody>
            {lapData.map(({ lap, lap_time, overall_time }) => {
              return (
                <tr>
                  <td
                    className={`lap-${
                      lapData.length > 2 &&
                      (lap == lLapTime.index
                        ? "l"
                        : lap == sLapTime.index && "s")
                    }`}
                  >
                    {lap}
                  </td>
                  <td>{dateFormatter.formatLapTime(lap_time)}</td>
                  <td className="overall-time">
                    {dateFormatter.formatLapTime(overall_time)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
