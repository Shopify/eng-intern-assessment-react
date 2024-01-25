import React from "react";
import "./App.css";
import "./fonts.css";

import StopWatch from "./StopWatch";
import NESBackground from "./NESBackground";

export default function App() {
  return (
    <div>
      <h1>test</h1>
      <h1>test</h1>
      <h1>test</h1>
      <h1>test</h1>

      <NESBackground size="large">
        <h1>«« SONICIFY »»</h1>
      </NESBackground>

      <StopWatch />

      <NESBackground>
        <h1>START NOW</h1>
        <h2>H2 Header</h2>
        <h3>H3 Header</h3>
        <p>Paragraph</p>
      </NESBackground>

      <NESBackground size="small">
        <h1>H1 Header</h1>
      </NESBackground>

      <NESBackground size="large">
        <h1>H1 Header</h1>
      </NESBackground>
    </div>
  );
}
