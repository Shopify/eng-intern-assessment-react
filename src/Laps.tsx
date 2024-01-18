import React from "react";
import { Card, DataTable } from "@shopify/polaris";

// Interface for a single lap's data
interface Lap {
  lapTime: number; // Lap time in milliseconds
  totalTime: number; // Total time elapsed in milliseconds
}

// Props for the Laps component
interface LapsProps {
  laps: Lap[]; // Array of laps
}

/**
 * Helper function to format time from milliseconds to mm:ss.xx format.
 * @param milliseconds - The time in milliseconds to format.
 * @returns A string representing the formatted time.
 */
function formatTime(milliseconds: number): string {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");
  const formattedMilliseconds = ((milliseconds % 1000) / 10)
    .toFixed(0)
    .padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
}

/**
 * The Laps component displays a list of laps as a data table.
 * Each lap shows the lap number, lap time, and total time.
 */
const Laps: React.FC<LapsProps> = ({ laps }) => {
  // Calculate the fastest and slowest lap times for highlighting
  const lapTimes = laps.map((lap) => lap.lapTime);
  const fastestLap = Math.min(...lapTimes);
  const slowestLap = Math.max(...lapTimes);

  // Convert laps into rows for the DataTable
  const rows = laps.map((lap, index) => {
    const lapTimeFormatted = formatTime(lap.lapTime);
    const totalTimeFormatted = formatTime(lap.totalTime);
    const color =
      lap.lapTime === fastestLap
        ? "blue"
        : lap.lapTime === slowestLap
        ? "red"
        : "black";

    return [
      <span style={{ color }}>{laps.length - index}</span>, // Lap number, displayed in reverse order
      <span style={{ color }}>{`+${lapTimeFormatted}`}</span>, // Lap time with '+' sign
      totalTimeFormatted, // Total time
    ];
  });

  // Render the laps as a data table within a card
  return (
    <div style={{ width: "40%" }}>
      <Card>
        <DataTable
          columnContentTypes={["text", "text", "text"]}
          headings={["Lap", "Lap time", "Total"]}
          rows={rows}
        />
      </Card>
    </div>
  );
};

export default Laps;
