import React, { useEffect, useState, useRef } from "react";
import Ellipsis from "./Ellipsis";
import { Text } from "@shopify/polaris";
import "./styles.css";
import StopWatchButton from "./StopWatchButton";
import { ButtonStatus } from "./types";
import Laps from "./Laps";

/**
 * The StopWatch component is responsible for displaying and controlling
 * a stopwatch with start, pause, reset, and lap functionalities.
 */
export default function StopWatch() {
  // State for the stopwatch button status (Play/Pause)
  const [btnStatus, setBtnStatus] = useState<ButtonStatus>(ButtonStatus.Play);

  // State for tracking time in minutes, seconds, and milliseconds
  const [time, setTime] = useState({
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  // State for storing lap times
  const [laps, setLaps] = useState([]); // Each lap will be { lapTime: number, totalTime: number }

  // Refs for managing time and animation frame
  const startTimeRef = useRef<number | null>(null);
  const elapsedTimeRef = useRef<number>(0);
  const requestRef = useRef<number>();

  // Function to update the stopwatch time
  const animate = () => {
    if (startTimeRef.current !== null) {
      const currentTime = Date.now();
      const elapsedTime =
        currentTime - startTimeRef.current + elapsedTimeRef.current;
      setTime({
        minutes: Math.floor(elapsedTime / 60000),
        seconds: Math.floor((elapsedTime / 1000) % 60),
        milliseconds: Math.floor(elapsedTime % 1000),
      });
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  // Helper function to format milliseconds for display
  const formatMilliseconds = (milliseconds: number) => {
    milliseconds = Math.floor(milliseconds / 10);
    return milliseconds < 10 ? `0${milliseconds}` : `${milliseconds}`;
  };

  // Effect hook to handle stopwatch start and pause functionality
  useEffect(() => {
    if (btnStatus === ButtonStatus.Pause) {
      startTimeRef.current = Date.now();
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (startTimeRef.current !== null) {
        elapsedTimeRef.current += Date.now() - startTimeRef.current;
        startTimeRef.current = null;
      }
      cancelAnimationFrame(requestRef.current);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [btnStatus]);

  // Constants for the stopwatch's visual elements
  const outerRadius = 200;
  const dotsRadius = 190;
  const dots = 60;
  const movingDotRadius = 180;

  // Function to handle stopwatch button status change
  const handleStatusChange = (status: ButtonStatus) => {
    setBtnStatus(
      status === ButtonStatus.Play ? ButtonStatus.Pause : ButtonStatus.Play
    );
  };

  // Function to reset the stopwatch
  const resetTimer = () => {
    setTime({ minutes: 0, seconds: 0, milliseconds: 0 });
    setLaps([]);
    elapsedTimeRef.current = 0;
    startTimeRef.current = null;
    cancelAnimationFrame(requestRef.current);
    setBtnStatus(ButtonStatus.Play);
  };

  // Function to record a lap time
  const addLap = () => {
    const newTotalTime =
      time.minutes * 60000 + time.seconds * 1000 + time.milliseconds;
    const lastLapTime = laps[0]?.totalTime || 0;
    const newLapTime = newTotalTime - lastLapTime;

    const newLap = { lapTime: newLapTime, totalTime: newTotalTime };
    setLaps([newLap, ...laps]);
  };

  // JSX for rendering the stopwatch component
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className="containerStyle">
        <Ellipsis
          outerRadius={outerRadius}
          dotsRadius={dotsRadius}
          dots={dots}
          movingDotRadius={movingDotRadius}
          minutes={time.minutes}
          seconds={time.seconds}
          milliseconds={time.milliseconds}
        />
        <div className="textStyle">
          <div style={{ display: "flex" }}>
            <div style={{ color: time.minutes > 0 ? "#27A397" : "black" }}>
              <Text variant="heading3xl" as="h2">{`${
                time.minutes < 10 ? `0${time.minutes}` : time.minutes
              }:`}</Text>
            </div>
            <div
              style={{
                color:
                  time.seconds > 0 || time.minutes > 0 ? "#27A397" : "black",
              }}
            >
              <Text variant="heading3xl" as="h2">{`${
                time.seconds < 10 ? `0${time.seconds}` : time.seconds
              }:`}</Text>
            </div>
            <div style={{ color: "#27A397" }}>
              <Text variant="heading3xl" as="h2">
                {formatMilliseconds(time.milliseconds)}
              </Text>
            </div>
          </div>
        </div>
        <div className="btnGroupStyle">
          <StopWatchButton
            onStatusChange={handleStatusChange}
            time={time}
            onReset={resetTimer}
            onLap={addLap}
          />
        </div>
      </div>
      {laps.length > 0 && <Laps laps={laps} />}
    </div>
  );
}
