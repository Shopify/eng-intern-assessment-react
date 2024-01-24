import React from "react";
import dateFormatter from "./utils/DateFormatter";

interface LapTime {
  lap: number;
  lap_time: number;
  overall_time: number;
}

interface LapTableProps {
  lapData: LapTime[];
}

export default function LapTable({ lapData }: LapTableProps) {
  return (
    <div className="lap-table-container">
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
                <td>{lap}</td>
                <td>{dateFormatter.formatLapTime(lap_time)}</td>
                <td className="overall-time">
                  {dateFormatter.formatLapTime(overall_time)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
