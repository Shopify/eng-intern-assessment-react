/* 
    A separate React component that represents the stopwatch display.
*/

// import useEffect hook and StopWatch CSS file
import React, { useEffect } from 'react';
import './StopWatch.css';


/* 
   Create an interface to specify props for the StopWatch component 
   - isRunning tracks the state, determining if the clock should run 
   - laps keeps track of the recorded laps in an array 
   - runningTime tracks the actual clock value
*/

interface StopwatchProps {
  isRunning: boolean;
  laps: number[];
  runningTime: number;
}

export default function Stopwatch({ isRunning, laps, runningTime }: StopwatchProps) {
    // Use useEffect to handle interval for updating the running time
    useEffect(() => {
      let interval: number;
  
      // Start the interval when the stopwatch is running
      if (isRunning) {
        interval = window.setInterval(() => {
          // Update the running time logic here
        }, 1000);
      }
  
      // Clear the interval when the component unmounts or is no longer running
      return () => {
        window.clearInterval(interval);
      };
    }, [isRunning]);
  
    // Function to format the time in minutes and seconds for the display
    function formatTime(time: number): string {
      const minutes = Math.floor(time / (1000 * 60));
      const seconds = Math.floor((time % (1000 * 60)) / 1000);
  
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  
    // Render the stopwatch container with running time and laps
    // NOTE: I decided to render both the laps and the time within the StopWatch component
    // Could have created a separate React component dedicated for the laps too!

    return (
      <div className="stopwatch-container">
        <h1>{formatTime(runningTime)}</h1>
        <div className="laps-container">
          <ul>
            {/* Map through laps and display lap number and lap time */}
            {laps.map((lap, index) => (
              <li key={index}>{`Lap ${laps.length - index}: ${formatTime(lap)}`}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
