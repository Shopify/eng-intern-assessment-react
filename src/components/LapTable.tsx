import React from "react";
import LapTableRow from "./LapTableRow";

interface LapTime {
  lap: number;
  lapTime: number;
  overallTime: number;
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
            {lapData.map(({ lap, lapTime, overallTime }: LapTime) => {
              return (
                <LapTableRow
                  lap={lap}
                  lapTime={lapTime}
                  overallTime={overallTime}
                  lLapTime={lLapTime}
                  sLapTime={sLapTime}
                  displayLab={lapData.length > 2}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
