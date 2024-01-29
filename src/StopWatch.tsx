import React from "react";
import { StopWatchButton } from "./StopWatchButton";
import Time from "./Time";

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
        <Time time={time} />
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
          onClick={() => {
            setLapTimes([...lapTimes, { id: lapTimeId++, time }]);
          }}
        >
          Lap
        </StopWatchButton>
        <StopWatchButton onClick={() => setTime(0)}>Reset</StopWatchButton>
      </div>
      {lapTimes.length === 0 ? null : (
        <div className="flex justify-center items-center flex-col mt-6">
          <h2 className="text-2xl text-primary-100">Laps Recorded</h2>
          {lapTimes.map((lapTime) => {
            return (
              <div
                data-testid="recorded-lap-item"
                key={lapTime.id}
                style={{
                  borderStyle: "solid none solid none",
                }}
                className="flex justify-between text-lg text-primary-200 w-[700px] mt-2 p-2 border border-primary-200"
              >
                <span>{`Lap ${lapTime.id + 1}`}</span>
                <div>
                  <Time time={lapTime.time} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StopWatch;
