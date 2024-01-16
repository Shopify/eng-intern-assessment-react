import React from "react";
import formatTime from "./FormatTime";
import StopWatchButton from "./StopWatchButton";
import Laplist from "./Laplist";
//Props for the stopwatch itself include isStarted, timer, and setTimer, these are used to get the timer and whether it is started or not from the main App component
export default function StopWatch() {
  const [isStarted, setIsStarted] = React.useState<boolean>(false); // A useState for whether the  stopwatch is started or not
  const [timer, setTimer] = React.useState<number>(0); //A useState for the timer itself
  const [lap, setLap] = React.useState<number[]>([]); //A useState number array that keeps track of each lap as they come

  function addLap() {
    //A function that adds a lap to the lap array and resets the timer, this is called in the StopWatchButton.tsx file when the lap button is pressed
    if (timer !== 0) {
      setLap([...lap, timer]); //Adds current timer to the lap list, showing the time of the current lap
      setTimer(0); //Resets the timer to 0
    }
  }

  // useEffect is used to update the timer every 10 milliseconds, this is what makes the stopwatch work
  React.useEffect(() => {
    if (isStarted) {
      const interval = setInterval(() => {
        setTimer(timer + 1);
      }, 10);
      return () => clearInterval(interval);
    }
  }, [isStarted, timer]);
  return (
    <div>
      <div data-testid="stopwatch" className="stopwatch">
        {formatTime(timer)}
      </div>
      <StopWatchButton
        isStarted={isStarted}
        setIsStarted={setIsStarted}
        setTimer={setTimer}
        addLap={addLap}
      />
      <Laplist lap={lap} />
    </div>
  );
}
