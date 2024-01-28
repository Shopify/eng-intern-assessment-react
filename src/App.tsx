import React from "react";
import "./styles/main.css";
import StopWatch from "./StopWatch";

export default function App() {
  return (
    <div className="h-screen m-auto max-w-[1100px] border">
      <div className="flex justify-center">
        <StopWatch />
      </div>
    </div>
  );
}
