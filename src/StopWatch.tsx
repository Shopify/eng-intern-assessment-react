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
  const [lapTimes, setLapTimes] = useState<number[] | null>([]);

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
    setLaps([]);
    setLapTimes([]);
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
    const lapTimeInMs = calculateLapTime(duration);
    const formattedLapTime = formatStopWatch(lapTimeInMs);
    const lapData = {
      number: laps.length + 1,
      interval: `${twoDigits(formattedLapTime.s)}s ${twoDigits(
        formattedLapTime.ms
      )}`,
      time: `${twoDigits(formattedTime.s)}s ${twoDigits(formattedTime.ms)}`,
    };
    const newLaps = laps.concat(lapData);
    const newLapTimes = lapTimes.concat(lapTimeInMs);
    setLapTimes(newLapTimes);
    setLaps(newLaps);
  };

  const formattedStopWatch = formatStopWatch(duration);
  const formattedFastest = formatStopWatch(Math.min(...lapTimes));
  const formattedSlowest = formatStopWatch(Math.max(...lapTimes));

  return (
    <>
      <div className="timer-container">
        <p className="screen numbers">
          <span>{twoDigits(formattedStopWatch.h)}:</span>
          <span>{twoDigits(formattedStopWatch.m)}:</span>
          <span className="enabled">{twoDigits(formattedStopWatch.s)}:</span>
          <span className="enabled">{twoDigits(formattedStopWatch.ms)}</span>
        </p>
        <div className="stopwatch-buttons">
          <StopWatchButton
            action={resetTime}
            isRunning={isRunning}
            hasStarted={hasStarted}
            kind="reset"
            defaultLabel="Reset"
          />
          <StopWatchButton
            action={toggleStopWatch}
            isRunning={isRunning}
            hasStarted={hasStarted}
            kind="player"
            defaultLabel="Start"
          />
          <StopWatchButton
            action={lap}
            isRunning={isRunning}
            hasStarted={hasStarted}
            kind="lap"
            defaultLabel="Lap"
          />
        </div>
        <div className="stats">
          <p className="fastest">
            Fastest:
            {lapTimes.length ? (
              <>
                {formattedFastest.h > 0 && (
                  <span>{twoDigits(formattedFastest.h)}:</span>
                )}
                {""}
                {formattedFastest.m > 0 && (
                  <span>{twoDigits(formattedFastest.m)}:</span>
                )}
                {""}
                <span>{twoDigits(formattedFastest.s)}:</span>
                <span>{twoDigits(formattedFastest.ms)}</span>
              </>
            ) : (
              ""
            )}
          </p>
          <p className="slowest">
            Slowest:
            {lapTimes.length ? (
              <>
                {formattedSlowest.h > 0 && (
                  <span>{twoDigits(formattedSlowest.h)}:</span>
                )}
                {""}
                {formattedSlowest.m > 0 && (
                  <span>{twoDigits(formattedSlowest.m)}:</span>
                )}
                {""}
                <span>{twoDigits(formattedSlowest.s)}:</span>
                <span>{twoDigits(formattedSlowest.ms)}</span>
              </>
            ) : (
              ""
            )}
          </p>
        </div>
      </div>
      <div className="laps-container">
        <h2 className="laps-title">Laps</h2>
        <div className="lap headers">
          <p className="lap-number">#</p>
          <p className="lap-time">Interval</p>
          <p className="lap-time">Time</p>
        </div>
        <div className="laps">
          {[...laps]
            .sort(
              (firstItem, secondItem) => secondItem.number - firstItem.number
            )
            .map((lap) => (
              <LapItem key={lap.number} lap={lap} />
            ))}
        </div>
      </div>
    </>
  );
}
