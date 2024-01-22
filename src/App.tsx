import React from "react";
import "./styles/main.css";
import StopWatch from "./StopWatch";

export default function App() {
  return (
    <div className="container">
      <div className="stopwatch-container">
        <StopWatch />
      </div>
    </div>
  );
}
