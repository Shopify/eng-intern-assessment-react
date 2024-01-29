//Imports for all necessary files
import React from 'react'
import './CSS Files/App.css';
import App from './App';
import StopWatchButton from './StopWatchButton';
import calculateTimer from './Helper/CalculateTimer';

// Props type definition for the Stopwatch component.
type Props = {
    timerArray: Array<number | string>;

  };
// The Stopwatch functional component displays the timer.
// It expects an array with the current time split into hours, minutes, and seconds.
  const Stopwatch: React.FC<Props> = ({ timerArray }) => {
// Render the stopwatch display using the timerArray values.
    return (
      <section className='time-container'>
        <p className='timer-text'>{timerArray[0]}</p>
        <span>:</span>
        <p className='timer-text'>{timerArray[1]}</p>
        <span>:</span>
        <p className='timer-text'>{timerArray[2]}</p>
      </section>
    );
  };
  
  export default Stopwatch;
