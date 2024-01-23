import React from "react";
import functions from "../functions";

interface LapsDisplayProps {
  laps: number[];
}

export default function LapsDisplay({ laps }: LapsDisplayProps) {
  const formatLapTime = (lapTime: number) => {
    const [hours, minutes, seconds, centiseconds] = functions.getTimeComponents(lapTime);

    return lapTime >= 360000 ? hours + ":" : "" + minutes + ":" + seconds + "." + centiseconds;
  };

  return (
    <div>
      {laps.map((lap, index) => (
        <div key={index}>
          Lap {index + 1} : {formatLapTime(lap)}
        </div>
      ))}
    </div>
  );
}
