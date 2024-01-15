import React from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";

export default function App() {
  const [isStarted, setIsStarted] = React.useState<boolean>(false);
  const [timer, setTimer] = React.useState<number>(0);
  return (
    <div>
      <StopWatch isStarted={isStarted} timer={timer} setTimer={setTimer} />
      <StopWatchButton isStarted={isStarted} setIsStarted={setIsStarted} timer={timer} setTimer={setTimer} />
    </div>
  );
}
