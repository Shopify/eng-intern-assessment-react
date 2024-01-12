import "./styles/App.css";

import React from "react";
import StopWatch from "./StopWatch";

export default function App() {
  return (
    <div>
      <p>Stopify Watch; an Apple clone</p>
      <p>by Jason Truong :)</p>

      <div className="app">
        <StopWatch />
      </div>
    </div>
  );
}
