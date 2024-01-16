import React from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import formatTime from "./FormatTime";
import "./styles/Lap.css";

export default function App() { // Main app page, this has the stopwatch function itself, the stopwatch buttons, and the lap list 
  const [isStarted, setIsStarted] = React.useState<boolean>(false); // A useState for whether the  stopwatch is started or not
  const [timer, setTimer] = React.useState<number>(0); //A useState for the timer itself
  const [lap, setLap] = React.useState<number[]>([]); //A useState number array that keeps track of each lap as they come 

  function addLap() { //A function that adds a lap to the lap array and resets the timer, this is called in the StopWatchButton.tsx file when the lap button is pressed
    setLap([...lap, timer]); //Adds current timer to the lap list, showing the time of the current lap 
    setTimer(0); //Resets the timer to 0
  }
  return ( //The return statement for the app, this is what is displayed on the screen
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
