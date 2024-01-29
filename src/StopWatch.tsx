import React from 'react'
import './CSS Files/App.css'; // Ensure this file exists and contains your styles
import App from './App';
import StopWatchButton from './StopWatchButton';
import calculateTimer from './Helper/CalculateTimer';

type Props = {
    timerArray: Array<number | string>;
  };
  const Stopwatch: React.FC<Props> = ({ timerArray }) => {
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
