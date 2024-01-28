import React from "react";
import "./../css/GameScene.css";
import ScrollingBackground from "./ScrollingBackground";
import SonicSprite from "./SonicSprite";
import StatsDisplay from "./StatsDisplay";
import MusicControl from "./MusicControl";
import StopWatch from "./StopWatch";

type GameSceneProps = {
  isRunning: boolean;
  workout: number;
};

const GameScene: React.FC<GameSceneProps> = ({ isRunning, workout }) => {
  return (
    <main className="game-scene" role="main">
      <ScrollingBackground isRunning={isRunning} workout={workout} />
      <SonicSprite isRunning={isRunning} workout={workout} />
      <StopWatch />
      <StatsDisplay />
      <MusicControl />
    </main>
  );
};

export default GameScene;
