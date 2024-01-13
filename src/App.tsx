import React from "react";

import "./styles/index.css"
import "./styles/stopwatch.css"
import "./styles/app.css"

import StopWatch from "./components/Stopwatch/StopWatch";

export default function App() {
  return (
    <div className="app">
      <StopWatch />
    </div>
  );
}
