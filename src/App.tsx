import React from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import formatTime from "./FormatTime";
import "./styles/Lap.css";

export default function App() {
  const [isStarted, setIsStarted] = React.useState<boolean>(false);
  const [timer, setTimer] = React.useState<number>(0);
  const [lap, setLap] = React.useState<number[]>([]);

  function addLap() {
    setLap([...lap, timer]);
    setTimer(0);
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
      <div className="lapList">
        {lap.map((lap, index) => (
          <div className="lap" key={index}>
            Lap {index + 1}: {formatTime(lap)}
          </div>
        ))}
      </div>
    </div>
  );
}
