import React, { useEffect, useState } from "react";
import { BlockStack, InlineStack, Text } from "@shopify/polaris";

import StopWatchButton from "./StopWatchButton";
import Lap from "./Lap";

interface Lap {
  id: number;
  time: number;
}

export default function StopWatch() {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [active, setActive] = useState<boolean>(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const [lapIdCounter, setLapIdCounter] = useState<number>(0);
  const [currentLapTime, setCurrentLapTime] = useState<number>(0);
  const [fastestLapId, setFastestLapId] = useState<number>(0);
  const [slowestLapId, setSlowestLapId] = useState<number>(0);

  useEffect(() => {
    if (!active) return;

    // Set up an interval (10ms) to increment the elapsed time and lap time
    const interval = 10;
    const intervalId = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + interval);
      setCurrentLapTime((prevLap) => prevLap + interval);
    }, interval);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [active]);

  // Format the elapsed time in hh:mm:ss:SS
  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    // Display only two decimal places for milliseconds
    const displayedMilliseconds = Math.floor((milliseconds % 1000) / 10);
    const displayedSeconds = totalSeconds % 60;
    const displayedMinutes = totalMinutes % 60;
    const displayedHours = totalHours;

    return [
      displayedHours,
      displayedMinutes,
      displayedSeconds,
      displayedMilliseconds,
    ]
      .map((value) => (value < 10 ? `0${value}` : value))
      .join(":");
  };

  const handleStartStopClick = () => {
    setActive((prevActive) => !prevActive);
  };

  const handleLapResetClick = () => {
    if (active) {
      // Compute fastest and slowest laps
      setLapIdCounter((prevId) => prevId + 1);
      const currentLap = { id: lapIdCounter + 1, time: currentLapTime };
      if (laps.length > 0) {
        const fastestLapId = [...laps, currentLap].reduce(
          (fastestId, current) =>
            current.time < laps.find((lap) => lap.id === fastestId).time
              ? current.id
              : fastestId,
          laps[0].id,
        );
        const slowestLapId = [...laps, currentLap].reduce(
          (slowestId, current) =>
            current.time > laps.find((lap) => lap.id === slowestId).time
              ? current.id
              : slowestId,
          laps[0].id,
        );
        setFastestLapId(fastestLapId);
        setSlowestLapId(slowestLapId);
      }
      // Add the current lap time to the laps
      setLaps((prevLaps) => [...prevLaps, currentLap]);
      setCurrentLapTime(0);
    } else {
      // Reset the elapsed time if the stopwatch is inactive
      setElapsedTime(0);
      setCurrentLapTime(0);
      setLapIdCounter(0);
      setFastestLapId(0);
      setSlowestLapId(0);
      setLaps([]);
    }
  };

  const resetLapButtonTone = active ? "success" : "critical";
  const startStopButtonTone = active ? "critical" : "success";

  return (
    <BlockStack align="space-between" gap="500">
      <Text alignment="center" as="p" variant="heading2xl" numeric>
        {formatTime(elapsedTime)}
      </Text>
      <InlineStack align="space-between">
        <StopWatchButton
          labels={["Reset", "Lap"]}
          disabled={elapsedTime === 0}
          active={active}
          tone={resetLapButtonTone}
          onClick={handleLapResetClick}
        />
        <StopWatchButton
          labels={["Start", "Stop"]}
          active={active}
          tone={startStopButtonTone}
          onClick={handleStartStopClick}
        />
      </InlineStack>

      {/* current lap */}
      {elapsedTime !== 0 && (
        <Lap lapNumber={laps.length + 1} lapTime={formatTime(currentLapTime)} />
      )}

      {/* completed laps */}
      {[...laps].reverse().map((lap, index) => (
        <Lap
          key={lap.id}
          lapNumber={laps.length - index}
          lapTime={formatTime(lap.time)}
          fastestLap={fastestLapId === lap.id}
          slowestLap={slowestLapId === lap.id}
        />
      ))}
    </BlockStack>
  );
}
