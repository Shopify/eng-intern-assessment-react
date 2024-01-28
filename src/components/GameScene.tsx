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
      {/* scrolling background that changes speed/still with running state and workout level */}
      <ScrollingBackground isRunning={isRunning} workout={workout} />

      {/* sonic animation changes with running state and workout level */}
      <SonicSprite isRunning={isRunning} workout={workout} />

      {/* stopwatch buttons rendered on game */}
      <StopWatch />

      {/* displays current running/stopwatch stats */}
      <StatsDisplay />

      {/* toggle for game music */}
      <MusicControl />
    </main>
  );
};

export default GameScene;
