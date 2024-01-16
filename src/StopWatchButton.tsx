import React from 'react';
import './styles/StopWatchButton.css'

interface StopWatchButtonProps {
  running?: boolean;
  recordLapTime: any;
  setRunning: any;
  resetTimer: any;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ running,  recordLapTime, setRunning, resetTimer}) => {
  return (
    <div className="stopWatchButtons">
        <div className="centerMargin">
            <button className="btn startButton" onClick={() => {setRunning(true)}}>Start</button>
            <button className="btn lapButton" onClick={() => {recordLapTime()}}>Lap</button>
            <button className="btn resetButton" onClick={() => {resetTimer()}}>Reset</button>
            <button className="btn stopButton" onClick={() => {setRunning(false)}}>Stop</button>
        </div>
    </div>    
  );
}

export default StopWatchButton;