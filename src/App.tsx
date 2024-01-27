import React from "react";
import "./App.css";
import StopWatch from "./components/StopWatch/StopWatch";
import StopWatchButton from "./components/StopWatchButton/StopWatchButton";

export default function App() {
  return (
    <main>
      <StopWatch />
      <StopWatchButton />
    </main>
  );
}
