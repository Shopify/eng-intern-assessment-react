import React from "react";

type Lap = {
  lapTime: number;
  totalTime: number;
};

type StopWatchButtonProps = {
  start: boolean;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  laps: Lap[];
  setLaps: React.Dispatch<React.SetStateAction<Lap[]>>;
  lapTime: number;
  setLapTime: React.Dispatch<React.SetStateAction<number>>;
};

export default function StopWatchButton({
  start,
  setStart,
  time,
  setTime,
  laps,
  setLaps,
  lapTime,
  setLapTime,
}: StopWatchButtonProps) {
  const handleReset = () => {
    setStart(false);
    setLaps([]);
    setTime(0);
    setLapTime(0);
  };
  const handleLap = () => {
    const newLapTime = time - lapTime;
    setLaps(prevLaps => [
      ...prevLaps,
      { lapTime: newLapTime, totalTime: time },
    ]);
    setLapTime(time);
  };
  return (
    <div>
      <button onClick={() => setStart(!start)}>
        {!start ? "Start" : "Stop"}
      </button>

      <button onClick={handleReset}>Reset</button>
      <button onClick={handleLap} disabled={!start}>
        Lap
      </button>
    </div>
  );
}
