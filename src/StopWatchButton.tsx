import { Button, Flex } from "@chakra-ui/react";
import { setMaxListeners } from "events";
import React from "react";

interface Props {
  running: boolean;
  setRunning: (v: boolean) => void;
  setTimePassed: (v: number) => void;
  setLastLapTime: (v: number) => void;
  setLaps: (v: []) => void;
  recordLap: () => void;
}

export default function StopWatchButton({
  running,
  setRunning,
  setTimePassed,
  setLaps,
  setLastLapTime,
  recordLap,
}: Props) {
  const reset = () => {
    //Reset everything to default state
    setRunning(false);
    setTimePassed(0);
    setLaps([]);
    setLastLapTime(0);
  };

  return (
    <Flex gap={2}>
      <Button color="blue" bgColor="white" onClick={reset}>
        Reset
      </Button>
      <Button
        color="red"
        bgColor="white"
        onClick={() => {
          setRunning(false);
        }}
        isDisabled={!running} //Doesn't make sense to be able to stop if it's not running
      >
        Stop
      </Button>
      <Button
        color="green"
        bgColor="white"
        onClick={() => {
          setRunning(true);
        }}
      >
        Start
      </Button>
      <Button
        color="black"
        bgColor="white"
        onClick={() => {
          recordLap();
        }}
        isDisabled={!running} //Doesn't make sense to be able to lap if running
      >
        Lap
      </Button>
    </Flex>
  );
}
