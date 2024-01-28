import React from "react";
import { StopWatchButton } from "./StopWatchButton";

let lapTimeId = 0;

const StopWatch: React.FC = () => {
  // not specifying the type here for useState since typescript can infer this from the initial state value
  const [time, setTime] = React.useState(0);
  const [isTimerRunning, setTimerRunning] = React.useState(false);
  const [lapTimes, setLapTimes] = React.useState<
    { id: number; time: number }[]
  >([]);

  React.useEffect(() => {
    let interval: NodeJS.Timer = null;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    // cleanup function
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  return (
    <div className="w-[100%]">
      <div className="flex justify-center font-bold text-6xl text-primary-200 mt-14">
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      <div className="flex justify-center space-x-6 mt-6">
        <StopWatchButton onClick={() => setTimerRunning(true)}>
          Start
        </StopWatchButton>
        <StopWatchButton onClick={() => setTimerRunning(false)}>
          Stop
        </StopWatchButton>
        <StopWatchButton onClick={() => setTimerRunning(true)}>
          Resume
        </StopWatchButton>
        <StopWatchButton
          onClick={() => setLapTimes([...lapTimes, { id: lapTimeId++, time }])}
        >
          Lap
        </StopWatchButton>
        <StopWatchButton onClick={() => setTime(0)}>Reset</StopWatchButton>
        <StopWatchButton onClick={() => console.log(lapTimes)}>
          Reset
        </StopWatchButton>
      </div>
      <div className="flex justify-center items-center flex-col mt-6">
        <h2 className="text-2xl text-primary-100">Laps Recorded</h2>
        {lapTimes.map((lapTime) => {
          return (
            <div
              id={lapTime.id.toString()}
              className="flex justify-between text-lg text-primary-200 border border-white w-[700px]"
            >
              <span>{`Lap ${lapTime.id + 1}`}</span>
              <div>
                <span>
                  {("0" + Math.floor((lapTime.time / 60000) % 60)).slice(-2)}:
                </span>
                <span>
                  {("0" + Math.floor((lapTime.time / 1000) % 60)).slice(-2)}:
                </span>
                <span>{("0" + ((lapTime.time / 10) % 100)).slice(-2)}</span>{" "}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StopWatch;
