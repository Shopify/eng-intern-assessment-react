import React from "react";

import ScrollingBackground from "./ScrollingBackground";
import SonicSprite from "./SonicSprite";
import "./GameScene.css";

type GameSceneProps = {
  isRunning: boolean;
  workout: number;
};

const GameScene: React.FC<GameSceneProps> = ({ isRunning, workout }) => {
  return (
    <div className="game-scene">
      <ScrollingBackground isRunning={isRunning} workout={workout} />
      <SonicSprite isRunning={isRunning} workout={workout} />
    </div>
  );
};

export default GameScene;
