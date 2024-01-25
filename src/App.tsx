import React from "react";
import StopWatch from "./StopWatch";
import "./styles.css";

export default function App() {
  return (
    <div className="main-stopwatch">
      <div className="timer-numbers">
        <h1>00</h1>
        <h1>00</h1>
        <h1>00</h1>
      </div>
      <div className="btns">
        <button className="btn btn-start">START</button>
        <button className="btn btn-stop">STOP</button>
        <button className="btn btn-reset">RESET</button>
        <button className="btn btn-lap">LAP</button>
      </div>
    </div>
  );
}
