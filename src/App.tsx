import React from "react";
import StopWatch from "./StopWatch";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Stop Watch by William Chau</h1>
      </div>
      <div className="stop-watch">
        <StopWatch></StopWatch>
      </div>
    </div>
  );
}
