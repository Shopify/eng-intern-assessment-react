import React from "react";

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
                <td>
                  {("0" + Math.floor((lap_time / 60000) % 60)).slice(-2) +
                    ":" +
                    ("0" + Math.floor((lap_time / 1000) % 60)).slice(-2) +
                    "." +
                    ("0" + ((lap_time / 10) % 100)).slice(-2)}
                </td>
                <td className="overall-time">
                  {("0" + Math.floor((overall_time / 60000) % 60)).slice(-2) +
                    ":" +
                    ("0" + Math.floor((overall_time / 1000) % 60)).slice(-2) +
                    "." +
                    ("0" + ((overall_time / 10) % 100)).slice(-2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
