import React from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";

export default function App() {
  const [isStarted, setIsStarted] = React.useState<boolean>(false);
  const [timer, setTimer] = React.useState<number>(0);
  const [lap, setLap] = React.useState<number[]>([]);

  function addLap() {
    console.log(lap)
    setLap([...lap, timer]);
  }
  return (
    <div>
      <StopWatch isStarted={isStarted} timer={timer} setTimer={setTimer} />
      <StopWatchButton
        isStarted={isStarted}
        setIsStarted={setIsStarted}
        setTimer={setTimer}
        addLap={addLap}
      />
      <div>
        {lap.map((lap, index) => (
          <div key={index}>{lap}</div>
        ))}
      </div>
    </div>
  );
}
