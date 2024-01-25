import React from "react";
import StopWatchButton from "./StopWatchButton";
import StopWatch from "./StopWatch";
import "./styles.css";

export default function App() {
  return (
    <div className="wrapper">
      <StopWatch time={0} />
      <div className="button-wrapper">
        <StopWatchButton type="start" onClick={() => {}} />
        <StopWatchButton type="reset" onClick={() => {}} />
      </div>
    </div>
  );
}
