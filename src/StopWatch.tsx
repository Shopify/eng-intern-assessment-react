import React, { useState, useEffect, useCallback } from "react";
import StopWatchButton from "./StopWatchButton";

// Function to format the time. This is necessary since both the time and lap times need to be formatted
export function formatTime(time: number): string {
  // Format the time in mm:ss:ms. Display hours only if reached
  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;
  // Format the minutes, seconds, and milliseconds to be two digits
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");
  const formattedMilliseconds = milliseconds.toString().padStart(2, "0");
  // If stopwatch reaches at least an hour, display the hours
  if (hours > 0) {
    const formattedHours = hours.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  }
  // Combine the values into a string
  const formattedTime = `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  return formattedTime;
}

// Always Display Hours (Matches UI Design Style)
function padTimeFormat(time: number): string {
  const formattedTime = formatTime(time);
  if (formattedTime.length === 8) {
    return `00:${formattedTime}`;
  }
  return formattedTime;
}

export default function StopWatch() {
  // State to track the time, whether the timer is on/off, and the lap times
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [lapTimes, setLapTimes] = useState<number[]>([]);

  // Stops the timer, resets the time, and clears the lap times. useCallback is used to prevent unnecessary re-renders
  const handleReset = useCallback(() => {
    setTimerOn(false);
    setTime(0);
    setLapTimes([]);
  }, []);

  // Every time timerOn changes, we start or stop the timer
  // useEffect is necessary since setInterval changes the state and we don't want to create an infinite loop
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (timerOn) {
      interval = setInterval(() => setTime((time) => time + 1), 10);
    }

    return () => {
      clearInterval(interval);
    }; // Clears the interval when the component unmounts or timerOn changes
  }, [timerOn]);

  return (
    <div className="stopwatch">
      <div className="stopwatch-content">
        {padTimeFormat(time).slice(0, 2) !== "00" ? (
          <div id="hour">
            {padTimeFormat(time).slice(0, 2)}
            <div className="stopwatch-unit">h</div>
          </div>
        ) : (
          <></>
        )}
        <div id="minute">
          {padTimeFormat(time).slice(3, 5)}
          <div className="stopwatch-unit">m</div>
        </div>
        <div id="second">
          {padTimeFormat(time).slice(6, 8)}
          <div className="stopwatch-unit">s</div>
        </div>
        {padTimeFormat(time).slice(0, 2) === "00" ? (
          <div id="milli">
            {padTimeFormat(time).slice(9, 11)}
            <div className="stopwatch-unit">ms</div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="laps">
        {lapTimes.length > 0 && (
          <div className="stopwatch-laptimes">
            {lapTimes.map((lapTime, index) => {
              return (
                <div className="laps-element" key={index}>
                  <div>Lap {index}</div>
                  <div>{formatTime(lapTime)}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="stopwatch-controls">
        {timerOn ? (
          <StopWatchButton
            type={"stop"}
            onClick={() => setTimerOn(false)}
          ></StopWatchButton>
        ) : (
          <StopWatchButton
            type={"start"}
            onClick={() => setTimerOn(true)}
          ></StopWatchButton>
        )}
        <StopWatchButton
          type={"lap"}
          onClick={() => setLapTimes([...lapTimes, time])}
          timerOn={timerOn}
          lapTimes={lapTimes}
        ></StopWatchButton>
        <StopWatchButton
          type={"reset"}
          onClick={handleReset}
          time={time}
        ></StopWatchButton>
      </div>
    </div>
  );
}
