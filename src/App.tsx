import React from "react";
import Stopwatch from "./Stopwatch";

export default function App() {
  return (
    <div>
      <h1>Stopwatch</h1>
      <Stopwatch
        elapsedTime={0}
        isRunning={false}
        laps={[]}
        startStop={() => {}}
        reset={() => {}}
        recordLap={() => {}}
      />
    </div>
  );
}
