// The main component that renders the stopwatch and handles its functionality.
import React from "react";
import StopWatch from "./Components/StopWatch";
import "./styles.css";

export default function App() {
  return (
    <>
      <div className="stopWatch">
        <h1>Dean Lane - Stop Watch</h1>
        <StopWatch />
      </div>
    </>
  );
}
