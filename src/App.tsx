import React from "react";
import StopWatch from "./StopWatch";
import "../main.css";

export default function App() {
  return (
    //parent components should be simple as well, only include stopwatch ocmponent and include the stopwatch button inside the stopwatch

    <div className="h-screen bg-black flex justify-center items-center">
      <StopWatch />
    </div>
  );
}
