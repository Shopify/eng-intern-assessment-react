import React, { useRef, useState } from "react";
import StopWatchButton from "./StopWatchButton";
import LapItem, { Lap } from "./LapItem";

//define time proportions
const msInSecond = 1000;
const secondsInMinute = 60;
const minutesInHour = 60;
const msInMinute = secondsInMinute * msInSecond;
const msInHour = minutesInHour * msInMinute;

//formatStopWatch makes sure the duration is formatted to hours, minutes, seconds and milliseconds
const formatStopWatch = (duration: number) => {
  let time = duration;
  const timeParts = {
    ms: 0,
    s: 0,
    m: 0,
    h: 0,
  };

  if (time > msInHour) {
    timeParts.h = Math.floor(time / msInHour);
    time %= msInHour;
  }

  if (time > msInMinute) {
    timeParts.m = Math.floor(time / msInMinute);
    time %= msInMinute;
  }

  if (time > msInSecond) {
    timeParts.s = Math.floor(time / msInSecond);
    time %= msInSecond;
  }

  timeParts.ms = Math.floor(time / 10);

  return timeParts;
};

//twoDigits transforms the format of numbers less than 10 to have a 0 on the left.
const twoDigits = (n: number) => {
  return n >= 10 ? String(n) : `0${n}`;
};

//StopWatch handles all timing functionality.
export default function StopWatch() {
  //lastTick is used to improve reliability in the actual calculation of duration in milliseconds
  const lastTick = useRef(null);
  const [duration, setDuration] = useState(0);
  //timer holds the setInterval so that it can be stopped.
  const [timer, setTimer] = useState<number | null>(null);
  const [previousLapTime, setPreviousLapTime] = useState<number | null>(null);

  //isRunning and hasStarted are used to control buttons states
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const [laps, setLaps] = useState<Lap[]>([]);

  //startTime calculates and sets the total duration of the timer in milliseconds.
  const startTime = () => {
    lastTick.current = Date.now();
    setIsRunning(true);
    setHasStarted(true);
    setTimer(
      window.setInterval(() => {
        const now = Date.now();
        const deltaTime = now - lastTick.current;
        setDuration((d) => d + deltaTime);
        lastTick.current = now;
      }, 1)
    );
  };

  //stopTime pauses the interval
  const stopTime = () => {
    window.clearInterval(timer);
    setIsRunning(false);
    setTimer(null);
  };

  const toggleStopWatch = () => {
    if (isRunning) {
      stopTime();
    } else {
      startTime();
    }
  };

  //resetTime makes stopwatch go back to 0
  const resetTime = () => {
    stopTime();
    setDuration(0);
    setHasStarted(false);
  };

  //calculateLapTime uses previousLapTime and current duration to find the delta between both of them
  const calculateLapTime = (currentDuration: number) => {
    const lapTime = previousLapTime
      ? currentDuration - previousLapTime
      : currentDuration;
    setPreviousLapTime(currentDuration);
    return lapTime;
  };

  const lap = () => {
    const formattedTime = formatStopWatch(duration);
    const formattedLapTime = formatStopWatch(calculateLapTime(duration));
    const lapData = {
      number: laps.length + 1,
      interval: `${twoDigits(formattedLapTime.s)}s ${twoDigits(
        formattedLapTime.ms
      )}`,
      time: `${twoDigits(formattedTime.s)}s ${twoDigits(formattedTime.ms)}`,
    };
    const newLaps = laps.concat(lapData);
    setLaps(newLaps);
  };

  const formattedStopWatch = formatStopWatch(duration);

  return (
    <>
      <p>
        {twoDigits(formattedStopWatch.h)}:{twoDigits(formattedStopWatch.m)}:
        {twoDigits(formattedStopWatch.s)}: {twoDigits(formattedStopWatch.ms)}
      </p>
      <StopWatchButton
        action={toggleStopWatch}
        isRunning={isRunning}
        hasStarted={hasStarted}
        kind="player"
        defaultLabel="Start"
      />
      <StopWatchButton
        action={resetTime}
        isRunning={isRunning}
        hasStarted={hasStarted}
        kind="reset"
        defaultLabel="Reset"
      />
      <StopWatchButton
        action={lap}
        isRunning={isRunning}
        hasStarted={hasStarted}
        kind="lap"
        defaultLabel="Lap"
      />
      <div>
        <h2>Laps</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <p>#</p>
          <p>Interval</p>
          <p>Time</p>
        </div>
        {laps.map((lap) => (
          <LapItem key={lap.number} lap={lap} />
        ))}
      </div>
    </>
  );
}
