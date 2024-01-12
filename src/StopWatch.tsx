import React from "react";
import "./app.css";

type Lap = {
  lapTime: number;
  totalTime: number;
};

type StopWatchProps = {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  lapTime: number;
  setLapTime: React.Dispatch<React.SetStateAction<number>>;
  laps: Lap[];
};

export default function StopWatch({
  time,
  setTime,
  laps,
  lapTime,
}: StopWatchProps) {
  const timeify = (time: number) => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const milliseconds = time % 100;

    return (
      hours.toString().toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0") +
      ":" +
      milliseconds.toString().padStart(2, "0")
    );
  };

  return (
    <div>
      <div className="stop-watch">{timeify(time)}</div>
      <div>
        Laps:
        <div>
          {laps.map(lap => (
            <div>
              <div>{timeify(lap.lapTime)}</div>
              <div>{timeify(lap.totalTime)}</div>
            </div>
          ))}{" "}
        </div>
      </div>
    </div>
  );
}
