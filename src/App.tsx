import React from "react";
import "./css/App.css";
import "./css/Fonts.css";

import { StopWatchProvider, useStopWatch } from "./components/StopWatchContext";

import NESBackground from "./components/NESBackground";
import RecordBoard from "./components/RecordBoard";
import GameScene from "./components/GameScene";

// component game scene and control panel (record board, can be used to add more functionality in the future: multiple sprite selection, etc)
const Game: React.FC = () => {
  // accessing running state and workout level from stopwatch context
  const { isRunning, workout } = useStopWatch();

  return (
    <div className="game">
      <GameScene isRunning={isRunning} workout={workout} />
      <div className="control-panel">
        <RecordBoard />
      </div>
    </div>
  );
};

export default function App() {
  // wrapping the game component with stopwatch context provider for the stopwatch functionality
  return (
    <StopWatchProvider>
      <NESBackground size="large">
        <h1>«« SONICIFY »»</h1>
      </NESBackground>
      <Game />
    </StopWatchProvider>
  );
}
