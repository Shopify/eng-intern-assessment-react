import React, { useEffect, useState, useRef } from "react";
import Ellipsis from "./Ellipsis";
import { Text } from "@shopify/polaris";
import "./styles.css";
import StopWatchButton from "./StopWatchButton";
import { ButtonStatus } from "./types";
import Laps from "./Laps";

export default function StopWatch() {
  const [btnStatus, setBtnStatus] = useState<ButtonStatus>(ButtonStatus.Play);

  const [time, setTime] = useState({
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  const [laps, setLaps] = useState([]); // Each lap will be { lapTime: number, totalTime: number }

  const startTimeRef = useRef<number | null>(null);
  const elapsedTimeRef = useRef<number>(0);
  const requestRef = useRef<number>();

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

  const formatMilliseconds = (milliseconds: number) => {
    milliseconds = Math.floor(milliseconds / 10);
    return milliseconds < 10 ? `0${milliseconds}` : `${milliseconds}`;
  };

  useEffect(() => {
    if (btnStatus === ButtonStatus.Pause) {
      startTimeRef.current = Date.now();
      requestRef.current = requestAnimationFrame(animate);
    } else {
      // Store the elapsed time when paused and clear the interval
      if (startTimeRef.current !== null) {
        elapsedTimeRef.current += Date.now() - startTimeRef.current;
        startTimeRef.current = null;
      }
      cancelAnimationFrame(requestRef.current);
    }

    return () => cancelAnimationFrame(requestRef.current);
  }, [btnStatus]);

  const outerRadius = 200; // Radius for the outer circle of the stopwatch
  const dotsRadius = 190; // Radius for the circle where the dots will be placed
  const dots = 60; // Number of dots
  const movingDotRadius = 180;

  // Styles to center the SVG container
  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    position: "relative",
  };

  // Styles for the centered text
  const textStyle: React.CSSProperties = {
    position: "absolute",
    top: "35%", // Center vertically
    left: "50%", // Center horizontally
    transform: "translate(-50%, -50%)", // Adjust to exact center
    fontSize: "1.5rem", // Adjust the fontSize as needed
    fontFamily: '"Arial", sans-serif', // Set the font, if you want to override Polaris defaults
    textAlign: "center", // Ensure the text itself is centered
  };

  const btnGroupStyle: React.CSSProperties = {
    position: "absolute",
    top: "65%", // Center vertically
    left: "50%", // Center horizontally
    transform: "translate(-50%, -50%)", // Adjust to exact center
    fontSize: "1.5rem", // Adjust the fontSize as needed
    fontFamily: '"Arial", sans-serif', // Set the font, if you want to override Polaris defaults
    textAlign: "center", // Ensure the text itself is centered
  };

  const handleStatusChange = (status: ButtonStatus) => {
    if (status === ButtonStatus.Play) {
      setBtnStatus(ButtonStatus.Pause);
    } else {
      setBtnStatus(ButtonStatus.Play);
    }
    // Additional logic based on the status
  };

  const resetTimer = () => {
    // Reset time state to zero
    setTime({
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });

    setLaps([]);

    // Reset elapsed time and start time references
    elapsedTimeRef.current = 0;
    startTimeRef.current = null;

    // If the timer is running, stop it
    cancelAnimationFrame(requestRef.current);

    // Optionally, you can also set the button status to 'Play'
    setBtnStatus(ButtonStatus.Play);
  };

  const addLap = () => {
    const newTotalTime =
      time.minutes * 60000 + time.seconds * 1000 + time.milliseconds;
    const lastLapTime = laps[0]?.totalTime || 0;
    const newLapTime = newTotalTime - lastLapTime;

    const newLap = {
      lapTime: newLapTime,
      totalTime: newTotalTime,
    };

    setLaps([newLap, ...laps]);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={containerStyle}>
        {/* Make sure the Ellipsis component also has position: 'absolute' and the same size and viewBox as MovingDot */}
        <Ellipsis
          outerRadius={outerRadius}
          dotsRadius={dotsRadius}
          dots={dots}
          movingDotRadius={movingDotRadius}
          minutes={time.minutes}
          seconds={time.seconds}
          milliseconds={time.milliseconds}
        />
        <div style={textStyle}>
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
        <div style={btnGroupStyle}>
          <StopWatchButton
            onStatusChange={handleStatusChange}
            onReset={resetTimer}
            onLap={addLap}
          />
        </div>
      </div>
      {laps.length > 0 && <Laps laps={laps} />}
    </div>
  );
}
