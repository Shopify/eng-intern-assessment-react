import React from "react";

// This is the button component, it is used to start, stop, reset, and add laps to the stopwatch
export default function StopWatchButton(props: { 
  //Props include isStarted, setIsStarted, setTimer, and addLap, these are to allow the buttons to change the stopwatch and add laps, props are used to get variables between components
  isStarted: boolean;
  setIsStarted: (isStarted: boolean) => void;
  setTimer: (timer: number) => void;
  addLap: () => void;
}) {
  const {isStarted, setTimer, setIsStarted, addLap} = props; //Destructuring props to get the variables needed
  return (
    <div className="buttonrow">
      <button
        className={isStarted ? "button stopbutton" : "button startbutton"}
        onClick={() => setIsStarted(!isStarted)}
      >
        {isStarted ? "Stop" : "Start"}
      </button>
      <button onClick={() => setTimer(0)} className="button resetbutton">
        Reset
      </button>
      <button onClick={() => addLap()} className="button lapbutton">
        Lap
      </button>
    </div>
  );
}
