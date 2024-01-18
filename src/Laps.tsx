import React from "react";
import { Card, DataTable } from "@shopify/polaris";

interface Lap {
  lapTime: number; // Store lap time as milliseconds
  totalTime: number; // Store total time as milliseconds
}

interface LapsProps {
  laps: Lap[];
}

// Helper function to format time from milliseconds to mm:ss.xx
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

const Laps: React.FC<LapsProps> = ({ laps }) => {
  // Find the fastest and slowest lap times
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
      <span style={{ color }}>{laps.length - index}</span>, // Lap number, reversed
      <span style={{ color }}>{`+${lapTimeFormatted}`}</span>, // Lap time with '+' sign
      totalTimeFormatted, // Total time
    ];
  });

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
