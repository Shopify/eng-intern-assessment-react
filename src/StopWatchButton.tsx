import React from "react";
import "./app.css";
import { Button, Stack } from "@chakra-ui/react";

type Lap = {
  lapId: number;
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
      { lapId: laps.length + 1, lapTime: newLapTime, totalTime: time },
      ...prevLaps,
    ]);
    setLapTime(time);
  };
  return (
    <div className="buttons">
      <Stack direction="row" spacing={4} align="center">
        <Button
          onClick={() => setStart(!start)}
          colorScheme="green"
          variant="outline"
        >
          {!start ? "Start" : "Stop"}
        </Button>

        <Button onClick={handleReset} colorScheme="green" variant="outline">
          Reset
        </Button>
        <Button
          onClick={handleLap}
          isDisabled={!start}
          colorScheme="green"
          variant="outline"
        >
          Lap
        </Button>
      </Stack>
    </div>
  );
}
