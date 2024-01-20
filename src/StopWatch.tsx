import React from "react";
import StopWatchComponent from "./components/StopWatchComponent";

export default function StopWatch() {
  return (
    <>
      {/* Created new component folder and added StopWatchComponent over there for
      better management of code as StopWatch is also a component so it looks good to have that under component folder, 
      but leaving this files over here because it was
      here and dont want to do anything with it */}
      <StopWatchComponent />
    </>
  );
}
