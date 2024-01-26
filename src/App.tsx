import React from "react";
import "./App.css";
import "./fonts.css";

import { StopWatchProvider, useStopWatch } from "./StopWatchContext";
import StopWatch from "./StopWatch";
import NESBackground from "./NESBackground";
import RecordBoard from "./RecordBoard";
import GameScene from "./GameScene";

const AppContent: React.FC = () => {
  const { isRunning, workout } = useStopWatch();

  return (
    <div className="app-content">
      <GameScene isRunning={isRunning} workout={workout} />
      <div className="control-panel">
        <StopWatch />
        <RecordBoard />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <StopWatchProvider>
      <NESBackground size="large">
        <h1>«« SONICIFY »»</h1>
      </NESBackground>
      <AppContent />
    </StopWatchProvider>
  );
}
