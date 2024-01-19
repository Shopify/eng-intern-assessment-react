
import React, { useState } from 'react';
import StopWatchButton from './StopWatchButton';
import "./StopWatch.css";

//setting up the inital stopwatch 
export default function StopWatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;

    //if the stopwatch is running, increment the time by 1 every second
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running]);

  //set the stop watching to "running" if the start button is clicked
  const startStopWatch = () => {
    setRunning(true);
  };

  //set the stop watching to "not running" if the stop button is clicked
  const stopStopWatch = () => {
    setRunning(false);
  };

  //clear the stopwatch if the clear button is clicked, set the time back to 0
  const clearStopWatch = () => {
    setTime(0);
  };

  //add a lap to the stopwatch if the lap button is clicked
  const addLapStopWatch = () => {
    setLaps((prevLaps) => [...prevLaps, time]);
  };

  //display the stopwatch and the buttons
  return (
    <div className="stop-watch">
      <div className="time">{time}</div>
      <StopWatchButton
        onStart={startStopWatch}
        onStop={stopStopWatch}
        onClear={clearStopWatch}
        onAddLap={addLapStopWatch}
      />

    {/* display the laps */}
      {laps.map((lap, index) => (
       <div key={index} className="lap">
       Lap {index + 1}: {lap}
     </div> 
      ))}
    </div>
  );
}

