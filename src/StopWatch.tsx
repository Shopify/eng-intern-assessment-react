import React, { useRef, useState } from "react";
import StopWatchButton from "./StopWatchButton";

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

  timeParts.ms = time;

  return timeParts;
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

  //resetTime makes stopwatch go back to 0
  const resetTime = () => {
    stopTime();
    setDuration(0);
    setHasStarted(false);
  };

  //calculateLapTime uses previousLapTime and current duration to find the delta between both of them
  const calculateLapTime = (currentDuration: number) => {
    const lapTime = previousLapTime ? currentDuration - previousLapTime : 0;
    setPreviousLapTime(currentDuration);
    return lapTime;
  };

  const lap = () => {
    console.log(calculateLapTime(duration));
  };

  const toggleStopWatch = () => {
    if (isRunning) {
      stopTime();
    } else {
      startTime();
    }
  };

  const formattedStopWatch = formatStopWatch(duration);

  return (
    <>
      <p>
        {formattedStopWatch.h}:{formattedStopWatch.m}:{formattedStopWatch.s}:
        {formattedStopWatch.ms}
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
    </>
  );
}
