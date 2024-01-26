import React from "react";
import StopWatchButton from "./components/StopWatchButton";
import StopWatch from "./components/StopWatch";

export default function App() {
  return (
    <>
      <div>
        <StopWatch />
      </div>
      <div>
        <StopWatchButton></StopWatchButton>
      </div>
    </>
  );
}
