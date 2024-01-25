import React from "react";
import { useState } from "react";


export default function StopWatchButton() {
    const [timer, setTimer] = useState<number>(0)
    const [counting, setCounting] = useState<boolean>(false);
    const [lap, setLap] = useState<number>(0);

 const handleClick = () => {setLap(lap + 1);};
 
  return (
    <div>
      <h1>Stopwatch</h1>
      <div>
        <span>{"0" + Math.floor((timer / 60000) % 60)};</span>
        <span>{"0" + Math.floor((timer / 1000) % 60)};</span>
        <span>{"0" + ((timer / 10) % 100)};</span>

        <button onClick={() =>{setCounting(true)}}>Start</button>
        <button onClick={() =>{setCounting(false)}}>Stop</button>
        <button onClick={() =>{setTimer(0)}}>Reset</button>
        <button onClick={handleClick}>Lap</button>
        <button onClick={() => {setLap(0)}}>Reset Laps</button>
      </div>
      <p>Laps: {lap}</p>
    </div>
  );
}

