import {
  BlockStack,
  ButtonGroup,
  Card,
  InlineStack,
  Text,
} from "@shopify/polaris";
import StopWatchButton from "./StopWatchButton";
import React, { useEffect, useState } from "react";
import LapTable from "./LapTable";

export default function StopWatch() {
  const [running, setRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  //first number is the lap duration, second number is the total elapsed time
  //we store the laps in state so that we can sort them with the Polaris DataTable component
  const [laps, setLaps] = useState<Array<number[]>>([]);

  const start = () => {
    setRunning(true);
  };
  const pause = () => {
    setRunning(false);
  };

  const reset = () => {
    setRunning(false);
    setLaps([]);
    //need to wait for the last millisecond to be added before we reset the time
    setTimeout(() => {
      setTime(0);
    }, 1);
  };

  const lap = () => {
    //if there are no laps, the last lap ended at 0
    let lastLapEnd = laps.length > 0 ? laps[laps.length - 1][1] : 0;
    setLaps([...laps, [time - lastLapEnd, time]]);
  };

  useEffect(() => {
    if (running) {
      setTimeout(() => {
        setTime((time) => time + 1);
      }, 1);
    }
  }, [running, time]);

  return (
    <BlockStack gap="1000">
      <Card>
        <BlockStack gap="400">
          <Text as="h2" variant="heading3xl">
            {new Date(time).toISOString().substring(11, 23)}
          </Text>
          <InlineStack align="space-between">
            <ButtonGroup>
              <StopWatchButton
                onClick={() => {
                  if (running) {
                    pause();
                  } else {
                    start();
                  }
                }}
                variant="primary"
              >
                {running ? "Pause" : "Start"}
              </StopWatchButton>
              <StopWatchButton onClick={() => lap()}>Lap</StopWatchButton>
            </ButtonGroup>
            <ButtonGroup>
              <StopWatchButton onClick={() => reset()} >Reset</StopWatchButton>
            </ButtonGroup>
          </InlineStack>
        </BlockStack>
      </Card>
      <LapTable laps={laps}></LapTable>
    </BlockStack>
  );
}
