import React from "react";
import StopWatchButton from "./StopWatchButton";
import { ButtonGroup, Card } from "@shopify/polaris";

export default function StopWatch() {
  return (
    <div>
      <ButtonGroup gap="loose" fullWidth={true}>
        <StopWatchButton onClick={() => console.log("hello world")}>
          Start
        </StopWatchButton>
        <StopWatchButton onClick={() => console.log("hello world")}>
          Stop
        </StopWatchButton>
        <StopWatchButton onClick={() => console.log("hello world")}>
          Reset
        </StopWatchButton>
        <StopWatchButton onClick={() => console.log("hello world")}>
          Lap
        </StopWatchButton>
      </ButtonGroup>
    </div>
  );
}
