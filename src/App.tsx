import React, { useEffect, useState } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";

export default function App() {
  //Elapsed time
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  //State of timer
  const [timerOn, setTimerOn] = useState(false);

  //Lap list
  const [lapList, setLapList] = useState([]);

  useEffect(() => {
    let interval: any = null;

    //If timer is on, increment seconds by 1 every 1000ms
    if (timerOn) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
      if (seconds === 60) {
        setMinutes((minutes) => minutes + 1);
        setSeconds(0);
      }
      if (minutes === 60) {
        setHours((hours) => hours + 1);
        setMinutes(0);
      }
    } else if (!timerOn && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn, seconds]);

  //Reset timer, lap list, and timer state
  function resetTimer() {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setTimerOn(false);
    setLapList([]);
  }

  //Start the timer
  function startTimer() {
    setTimerOn(true);
  }

  //Stop the timer
  function stopTimer() {
    setTimerOn(false);
  }

  //Record lap time
  function lapTimer() {
    setLapList((lapList) => [...lapList, [hours, minutes, seconds]]);
  }

  return (
    <div
      id="StopWatchApp"
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <StopWatch hours={hours} minutes={minutes} seconds={seconds} />
      <div className="Button">
        <StopWatchButton onClick={startTimer} label="Start" />
        <StopWatchButton onClick={stopTimer} label="Stop" />
        <StopWatchButton onClick={resetTimer} label="Reset" />
        <StopWatchButton onClick={lapTimer} label="Lap" />
        <ul style={{ listStyleType: "none", textAlign: "center" }}>
          {lapList.map((lap, index) => {
            return (
              <li key={index}>
                Lap{index + 1}: {lap[0]}:{lap[1]}:{lap[2]}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
