import React from "react";
import Button from "react-bootstrap/Button";

interface Props {
  isRunning: boolean;
  startTimer: () => void;
  stopResetTimer: () => void;
  recordLap: () => void;
}

const StopWatchButton: React.FC<Props> = ({
  isRunning,
  startTimer,
  stopResetTimer,
  recordLap,
}) => {
  return (
    <div>
      <Button variant="primary" onClick={startTimer}>
        {isRunning ? "Pause" : "Start"}
      </Button>{" "}
      <Button variant="success" onClick={recordLap}>
        Lap
      </Button>{" "}
      <Button variant="danger" onClick={stopResetTimer}>
        Stop
      </Button>{" "}
    </div>
  );
};

export default StopWatchButton;
