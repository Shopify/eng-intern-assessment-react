import React, { createContext, useEffect, useState } from "react";
import "./StopWatch.css";
import StopWatchButton from "../StopWatchButton/StopWatchButton";

interface StopWatchContextInterface {
  command: string;
  setCommand: Function;
}

export const StopWatchContext = createContext<StopWatchContextInterface>({
  command: "",
  setCommand: () => {},
});

/**
 * * This Component displays the stopwatch and the laps.
 * * We used useContext to communicate with the buttons.
 **/

export default function StopWatch() {
  const [command, setCommand] = useState<string>("");
  const [laps, setLaps] = useState<string[]>([]);
  const [time, setTime] = useState<number>(0);
  const minutes = Math.floor((time / 60000) % 60);
  const seconds = Math.floor((time / 1000) % 60);
  const milliseconds = Math.floor((time / 10) % 100);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout;

    switch (command) {
      case "start":
        interval = setInterval(() => setTime(time + 10), 10);
        break;
      case "stop":
        if (time !== 0) {
          clearInterval(interval);
        }
        break;
      case "reset":
        setTime(0);
        setLaps([]);
        setCommand("");
        break;
      case "resume":
        interval = setInterval(() => setTime(time + 10), 10);
        break;
      case "pause":
        clearInterval(interval);
        break;
    }

    return () => clearInterval(interval);
  }, [time, command]);

  const CheckForLeadingZero = (value: number) => {
    if (value < 10) {
      return "0" + value;
    } else {
      return value;
    }
  };

  useEffect(() => {
    if (command === "lap" && time !== 0) {
      setLaps([
        ...laps,
        `${CheckForLeadingZero(minutes)}:${CheckForLeadingZero(
          seconds
        )}:${CheckForLeadingZero(milliseconds)}`,
      ]);

      setCommand("resume");
    }
  }, [command]);

  return (
    <StopWatchContext.Provider value={{ command, setCommand }}>
      <div>
        <div className="stop-watch-main-display" id="stop-watch-time">
          {command === "stop" ? (
            "Stopped"
          ) : (
            <div>
              {`${CheckForLeadingZero(minutes)}:${CheckForLeadingZero(
                seconds
              )}:${CheckForLeadingZero(milliseconds)}`}
            </div>
          )}
        </div>

        <StopWatchButton />
        <div className="stop-watch-laps-main-display" data-testid="lap-list">
          {laps.map((lap, index) => (
            <div key={index} className="stop-watch-laps-inner-display">
              <div> Lap {index + 1}:</div>
              <div>{lap}</div>
            </div>
          ))}
        </div>
      </div>
    </StopWatchContext.Provider>
  );
}
