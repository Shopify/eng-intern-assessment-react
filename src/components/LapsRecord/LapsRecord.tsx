import React from "react";
import { Lap } from "../../hooks/useStopWatch";
import styles from "./LapsRecord.module.css";

interface LapsRecordProps {
  lapsData: Lap[];
}

export default function LapsRecord({ lapsData }: LapsRecordProps) {
  return (
    <table className={styles.tableContainer}>
      <thead>
        <tr>
          <th>Lap #</th>
          <th>Elapsed Time</th>
          <th>Total Time</th>
        </tr>
      </thead>
      <tbody data-testid="lap-list">
        {lapsData.map(({ lap, elapsedTime, totalTime }) => (
          <tr key={`${lap}-${elapsedTime}-${totalTime}`}>
            <td>{lap}</td>
            <td>{elapsedTime}</td>
            <td>{totalTime}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
