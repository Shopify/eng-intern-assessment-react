import React from "react";
import Button from "react-bootstrap/Button";

const StopWatchButton: React.FC = () => {
  return (
    <div>
      <Button variant="success">Start</Button>{" "}
      <Button variant="primary">Pause</Button>{" "}
      <Button variant="primary">Lap</Button>{" "}
      <Button variant="danger">Stop</Button>{" "}
    </div>
  );
};

export default StopWatchButton;
