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
    <div className="game-scene">
      <ScrollingBackground isRunning={isRunning} workout={workout} />
      <SonicSprite isRunning={isRunning} workout={workout} />
      <StatsDisplay />
      <ControlsText />
    </div>
  );
};

export default GameScene;
