import React from "react";
import StopWatch from "./StopWatch";
import "./app.css";

export default function App() {
  return (
    <div className="flex flex-col items-center">
      <h1>Stopwatch</h1>
      <StopWatch />
    </div>
  );
}
