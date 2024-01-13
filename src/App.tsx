import React from "react";
import StopWatch from "./StopWatch";

export default function App() {
  return (
    <div
      style={{
        display: "flex",
        height: "90vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StopWatch />
    </div>
  );
}
