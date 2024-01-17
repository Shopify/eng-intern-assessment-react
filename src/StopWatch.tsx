import React from 'react';

interface StopWatchProps {
    minutes: string;
    seconds: string;
    milliseconds: string;
  }
  
  /**
     * This component takes in the appropriate stopwatch timer values and displays them
     */
  const StopWatch: React.FC<StopWatchProps> = ({ minutes, seconds, milliseconds}) => {
    return (
        <div className="timer-container">
            <div className="timer-box">
            <h1>{minutes}</h1>
            </div>
            <span className="colon">:</span>
            <div className="timer-box">
            <h1>{seconds}</h1>
            </div>
            <span className="colon">:</span>
            <div className="timer-box">
            <h1>{milliseconds}</h1>
            </div>
        </div>
    );
  };
  
  export default StopWatch;