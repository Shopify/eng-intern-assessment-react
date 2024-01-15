import React, { useEffect, useState } from "react";
import StopWatchButton from "./StopWatchButton";
import { ButtonGroup, Card, Layout, Text } from "@shopify/polaris";
import { formatTime } from "./utils";
import LapsList from "./LapsList";

export default function StopWatch() {
  const [isWatchStarted, setIsWatchStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [laps, setLaps] = useState<{ lapTime: number; totalTime: number }[]>(
    []
  );

  const startWatch = () => {
    setIsWatchStarted(true);
  };

  const stopWatch = () => {
    setIsWatchStarted(false);
  };

  const resetWatch = () => {
    stopWatch();
    setLaps([]);
    setTimer(0);
  };

  const WatchStartStop = () => {
    if (isWatchStarted) {
      stopWatch();
    } else {
      startWatch();
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout = null;
    if (isWatchStarted) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isWatchStarted]);

  const lapCounter = () => {
    let lastLap = 0;
    if (laps.length != 0) {
      lastLap = laps[laps.length - 1].lapTime;
    }
    setLaps((prevLaps) => [
      ...prevLaps,
      { lapTime: timer - lastLap, totalTime: timer },
    ]);
  };

  // spllited the time to show in different spans
  const timeArray = formatTime(timer).split(":");

  return (
    <Layout>
      <Layout.Section variant="fullWidth">
        <Text variant="heading3xl" as="h1" alignment="center">
          <span style={{ width: "60px" }}>{timeArray[0]}</span>
          <span> : </span>
          <span style={{ width: "60px" }}>{timeArray[1]}</span>
          <span> : </span>
          <span style={{ width: "60px" }}>{timeArray[2]}</span>
        </Text>
      </Layout.Section>

      <Layout.Section variant="fullWidth">
        <ButtonGroup gap="loose" fullWidth={true}>
          <StopWatchButton onClick={WatchStartStop}>
            {isWatchStarted ? "Stop" : "Start"}
          </StopWatchButton>
          <StopWatchButton onClick={resetWatch}>Reset</StopWatchButton>
          <StopWatchButton onClick={lapCounter}>Lap</StopWatchButton>
        </ButtonGroup>
      </Layout.Section>

      <Layout.Section variant="oneThird">
        <LapsList laps={laps} />
      </Layout.Section>
    </Layout>
  );
}
