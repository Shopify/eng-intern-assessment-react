import React, { useState, useEffect } from 'react';
import StopwatchButton from './StopWatchButton'; 
import './styles.css'; 

// Defining interface of a Lap object
interface Lap {
  hours: number;
  minutes: number;
  seconds: number;
}

// Stopwatch component
const Stopwatch: React.FC = () => {
  // State variables to manage time and laps
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [laps, setLaps] = useState<Lap[]>([]); // Array to store laps
  const [timerId, setTimerId] = useState<number | null>(null); // Timer ID for setInterval

  // Function to start the stopwatch
  const handleStart = () => {
    if (timerId === null) {
      const id = window.setInterval(() => {
        setSeconds((prevState) => prevState + 1);
      }, 1000);
      setTimerId(id); // Setting timer ID to state
    }
  };

  // Function to stop the stopwatch
  const handleStop = () => {
    if (timerId !== null) {
      clearInterval(timerId); // Clearing the interval
      setTimerId(null); // Resetting timer ID
    }
  };

  // Function to reset the stopwatch
  const handleReset = () => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setLaps([]); // Resetting laps
    handleStop(); // Stopping the timer
  };

  // Function to handle lap button click
  const handleLap = () => {
    const lap: Lap = { hours, minutes, seconds }; // Creating a lap object
    setLaps((prevLaps) => [...prevLaps, lap]); // Adding lap to laps array
  };

  // Handle minute and hour increments
  useEffect(() => {
    if (seconds === 60) {
      setSeconds(0);
      setMinutes((prevMinutes) => prevMinutes + 1);
    }
    if (minutes === 60) {
      setMinutes(0);
      setHours((prevHours) => prevHours + 1);
    }
  }, [seconds, minutes]);

  // Rendering the Stopwatch component
  return (
    <div className="stopwatch">
      <header className="stopwatch-header">
        <h1 className="stopwatch-title">Shopify</h1>
        <div className="time-circle">
          <div className="time-text">
            <div>{hours} : {minutes} : {seconds}</div>
          </div>
        </div>

        {/* Buttons for controlling the stopwatch */}
        <div className="button-container">
          <StopwatchButton onClick={handleStart} label="Start" />
          <StopwatchButton onClick={handleStop} label="Stop" />
          <StopwatchButton onClick={handleReset} label="Reset" />
          <StopwatchButton onClick={handleLap} label="Lap" />
        </div>

        {/* Displaying the lap times */}
        <div className="lap-container">
          {laps.map((lap, index) => (
            <div key={index} className="lap-item">
              Lap {index + 1}: {lap.hours}h :{lap.minutes}m :{lap.seconds}s
            </div>
          ))}
        </div>
      </header>
    </div>
  );
};

export default Stopwatch;


