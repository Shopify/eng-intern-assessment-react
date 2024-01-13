import React, { useEffect, useState } from "react";
import StopWatchButton from "./StopWatchButton";
import { formatTime } from "./utils";
import { ButtonGroup, Card, Text } from "@shopify/polaris";
import LapRecords from "./LapRecords";

export default function StopWatch() {
  const [time, setTime] = useState<number>(0);
  const [lapTimes, setLapTimes] = useState<Array<number>>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("Start");

  //functions triggered when buttons are clicked
  const toggleWatch = () => {
    setIsRunning(!isRunning);
    const newButtonText = isRunning ? "Resume" : "Pause";
    setButtonText(newButtonText);
  };

  const resetWatch = () => {
    setIsRunning(false);
    setButtonText("Start");
    setTime(0);
    setLapTimes([]);
  };

  const recordLap = () => {
    setLapTimes((prev) => [...prev, time]);
    setTime(0);
  };

  //Update state when the stopwatch is toggled
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    //clean up timer when reset or component unmounts
    return () => clearInterval(timer);
  }, [isRunning]);

  const formattedTime = formatTime(time);

  return (
    <Card padding="1000">
      <Text variant="heading3xl" as="h1" alignment="center">
        {formattedTime}
      </Text>
      <div
        style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}
      >
        <ButtonGroup>
          <StopWatchButton
            buttonText={buttonText}
            onClickHandler={toggleWatch}
          />
          <StopWatchButton buttonText="Reset" onClickHandler={resetWatch} />
          <StopWatchButton
            buttonText="Lap"
            onClickHandler={recordLap}
            shouldDisable={!isRunning}
          />
        </ButtonGroup>
      </div>
      {/* Display lap records if available */}
      {lapTimes.length > 0 && <LapRecords lapTimes={lapTimes} />}
    </Card>
  );
}
