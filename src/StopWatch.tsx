import React from "react";
import StopWatchButton from "./StopWatchButton";
import "./app.css";

type Lap = {
  lapTime: number;
  totalTime: number;
};

type StopWatchProps = {
  start: boolean;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  laps: Lap[];
  setLaps: React.Dispatch<React.SetStateAction<Lap[]>>;
  lapTime: number;
  setLapTime: React.Dispatch<React.SetStateAction<number>>;
};

export default function StopWatch({
  start,
  setStart,
  time,
  setTime,
  laps,
  setLaps,
  lapTime,
  setLapTime,
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
      <StopWatchButton
        start={start}
        setStart={setStart}
        setTime={setTime}
        time={time}
        laps={laps}
        setLaps={setLaps}
        lapTime={lapTime}
        setLapTime={setLapTime}
      ></StopWatchButton>
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
