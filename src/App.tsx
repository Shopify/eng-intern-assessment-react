import React from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import formatTime from "./FormatTime";
import "./styles/Lap.css";

export default function App() {

  return ( //The return statement for the app, this is what is displayed on the screen
    <div>
      <StopWatch />
    </div>
  );
}
