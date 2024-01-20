import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";
import SavedLaps from "./SavedLaps";

export default function StopWatch() {
  return (
    <>
      <StopWatchButton />
      <SavedLaps />
    </>
  );
}
