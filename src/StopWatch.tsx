import React, { useState, useEffect } from "react";

export default function StopWatch() {
  //Managing state of the current time and a boolean to check if it is currently running

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  //using this useEffect hook to take advantage of setInterval

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
    }
  });

  return <div></div>;
}
