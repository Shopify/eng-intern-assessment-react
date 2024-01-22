import React from "react";
import StopWatch from "./StopWatch";
import "./app.css";

export default function App() {
  return (
    <div className="main-wrapper">
      <h1 className="title">Stopwatch</h1>
      <StopWatch />
    </div>
  );
}
