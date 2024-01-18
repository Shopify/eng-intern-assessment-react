import { Button, Flex } from "@chakra-ui/react";
import React from "react";

interface Props {
  running: boolean;
  setRunning: (v: boolean) => void;
  recordLap: () => void;
}

export default function StopWatchButton({
  running,
  setRunning,
  recordLap,
}: Props) {
  return (
    <Flex gap={2}>
      <Button
        color="red"
        bgColor="white"
        onClick={() => {
          setRunning(false);
        }}
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
