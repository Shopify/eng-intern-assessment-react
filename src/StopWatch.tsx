import React, { CSSProperties } from "react";
import { formatTime } from "./helpers";
import StopWatchButton from "./StopWatchButton";

// CSS styles
const styles: { [key: string]: CSSProperties } = {
  appContainer: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "20px",
  },
  heading: {
    fontSize: "36px",
    marginBottom: "20px",
    color: "#333",
    textTransform: "uppercase",
  },
  lapContainer: {
    marginTop: "20px",
    textAlign: "center",
  },
  lapList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  lapItem: {
    fontSize: "18px",
    marginBottom: "5px",
  },
};

const Stopwatch = () => {
  // main app state
  const [isRunning, setIsRunning] = React.useState<boolean>(false);
  const [time, setTime] = React.useState<number>(0);
  const [laps, setLaps] = React.useState<string[]>([]);

  // Update time while it is running
  React.useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  // Start stopwatch when start btn clicked
  const startStopwatch = () => {
    setIsRunning(true);
  };

  // Stop stopwatch when stop btn clicked
  const stopStopwatch = () => {
    setIsRunning(false);
  };

  // Reset stopwatch when reset btn clicked
  const resetStopwatch = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  // record a lap when lap btn clicked
  const recordLap = () => {
    setLaps((prevLaps) => [...prevLaps, formatTime(time)]);
  };

  return (
    <div style={styles.appContainer}>
      <h1 style={styles.heading}>Stopwatch</h1>
      <h2>{formatTime(time)}</h2>
      <StopWatchButton
        isRunning={isRunning}
        onStart={startStopwatch}
        onStop={stopStopwatch}
        onReset={resetStopwatch}
        onLap={recordLap}
      />
      <div style={styles.lapContainer}>
        <ul style={styles.lapList}>
          {laps.map((lap, index) => (
            <li key={index} style={styles.lapItem}>
              Lap {index + 1}: {lap} seconds
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Stopwatch;
