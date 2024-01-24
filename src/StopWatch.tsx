// import React, { useEffect, useState } from 'react';
// import "./StopWatch.css";

// /* 
// A separate component that represents the stopwatch display.
// */

// interface StopwatchProps {
//   isRunning: boolean;
//   laps: number[];
//   runningTime: number;
// }

// export default function Stopwatch({ isRunning, laps, runningTime }: StopwatchProps) {

//   useEffect(() => {
//     let interval: number;

//     if (isRunning) {
//       interval = window.setInterval(() => {
//         // Update the running time logic here
//       }, 1000);
//     }

//     return () => {
//       window.clearInterval(interval);
//     };
//   }, [isRunning]);

//   function formatTime(time: number): string {
//     const minutes = Math.floor(time / (1000 * 60));
//     const seconds = Math.floor((time % (1000 * 60)) / 1000);

//     return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
//   }

//   return (
//     <div className="container"> {/* Apply the 'container' class */}
//     <h1>{formatTime(runningTime)}</h1>
//     <ul>
//         {laps.map((lap, index) => (
//         <li key={index}>{`Lap ${laps.length - index}: ${formatTime(lap)}`}</li>
//         ))}
//     </ul>
//     </div>
// );

// }

import React, { useEffect } from 'react';
import './StopWatch.css';

interface StopwatchProps {
  isRunning: boolean;
  laps: number[];
  runningTime: number;
}

export default function Stopwatch({ isRunning, laps, runningTime }: StopwatchProps) {
  useEffect(() => {
    let interval: number;

    if (isRunning) {
      interval = window.setInterval(() => {}, 1000);
    }

    return () => {
      window.clearInterval(interval);
    };
  }, [isRunning]);

  function formatTime(time: number): string {
    const minutes = Math.floor(time / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  return (
    <div className="stopwatch-container">
      <h1>{formatTime(runningTime)}</h1>
      <div className="laps-container">
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>{`Lap ${laps.length - index}: ${formatTime(lap)}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
