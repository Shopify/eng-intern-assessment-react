import React from "react";
import { formatTime } from "./utils";
import { Card, DataTable, LegacyCard } from "@shopify/polaris";

type LapsListProp = {
  laps: { lapTime: number; totalTime: number }[];
};

const LapsList = ({ laps }: LapsListProp) => {
  const lapData = laps.map((lap, index) => [
    index + 1,
    formatTime(lap.lapTime),
    formatTime(lap.totalTime),
  ]);
  return (
    <div>
      <DataTable
        headings={["Lap #", "Lap Time", "Total Time"]}
        columnContentTypes={["numeric", "text", "text"]}
        rows={lapData}
      />
    </div>
  );
};

export default LapsList;
