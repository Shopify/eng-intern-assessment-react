import React from "react";

export default function StopWatchButton(props: any) {
  //Handle the start Click using props
  const handleStartClick = () => {
    if (!props.isRunning) {
      return props.start();
    } else {
      return alert("Timer is already running");
    }
  };

  //Handle the stop Click using props
  const handleStopClick = () => {
    if (props.isRunning) {
      return props.stop();
    } else {
      return alert("Timer is not running");
    }
  };

  //Handle the Reset Click using props
  const handleResetClick = () => {
    return props.reset();
  };

  return (
    <>
      <button onClick={handleStartClick}>Start</button>
      <button onClick={handleStopClick}>Stop</button>
      <button onClick={handleResetClick}>Reset</button>
    </>
  );
}
