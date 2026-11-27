import React from "react";
import "./App.css";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";

export default function App() {
  return (
    <>
      <div>
        <h3>hi</h3>
      </div>
      <StopWatch />
      <StopWatchButton
        type={"start"}
        onClick={() => console.log("Start clicked")}
      />
      <StopWatchButton
        type={"stop"}
        onClick={() => console.log("Stop clicked")}
      />
      <StopWatchButton
        type={"reset"}
        onClick={() => console.log("Reset clicked")}
      />
    </>
  );
}
