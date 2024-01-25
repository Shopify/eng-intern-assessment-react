import React from "react";
import { useState } from "react";


export default function StopWatchButton() {
    const [timer, setTimer] = useState<number>(0)
  return (
    <div>
      <h1>Stopwatch</h1>
      <div>
        <span>{"0" + Math.floor((timer / 60000) % 60)};</span>
        <span>{"0" + Math.floor((timer / 1000) % 60)};</span>
        <span>{"0" + Math.floor((timer / 10) % 100)};</span>

        <button>Start</button>
        <button>Stop</button>
        <button>Reset</button>
        <button>Lap</button>
      </div>
    </div>
  );
}

