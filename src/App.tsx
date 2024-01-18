import React from "react";
import StopWatch from "./StopWatch";

export default function App() {
  return (
    //Going to use an empty fragment just for the sake of simplicity.
    //parent components should be simple as well, only include stopwatch ocmponent and include the stopwatch button inside the stopwatch

    <>
      <StopWatch />
    </>
  );
}
