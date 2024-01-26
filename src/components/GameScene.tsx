import React from "react";
import "./../css/GameScene.css";

import ScrollingBackground from "./ScrollingBackground";
import SonicSprite from "./SonicSprite";
import StatsDisplay from "./StatsDisplay";
import ControlsText from "./ControlsText";

type GameSceneProps = {
  isRunning: boolean;
  workout: number;
};

const GameScene: React.FC<GameSceneProps> = ({ isRunning, workout }) => {
  return (
    <main
      className="game-scene"
      role="main"
      aria-label="Interactive Sonic stopwatch running game scene with keyboard controls to control sonic and stats"
    >
      <ScrollingBackground isRunning={isRunning} workout={workout} />
      <SonicSprite isRunning={isRunning} workout={workout} />
      <StatsDisplay />
      <ControlsText />
    </main>
  );
};

export default GameScene;
