import "./styles/App.css";

import React from "react";
import StopWatch from "./StopWatch";

export default function App() {
  return (
    <div>
      <p>Stopify Watch</p>
      <p>by Jason Truong</p>
      <p className="smallText">It's really just an apple clone :P</p>

      <div className="app">
        <StopWatch />
      </div>
    </div>
  );
}
