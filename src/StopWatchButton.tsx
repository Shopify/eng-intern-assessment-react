import React from 'react';
import './styles/StopWatchButton.css'

interface StopWatchButtonProps {
  running?: boolean;
  recordLapTime: any;
  setRunning: any;
  resetTimer: any;
  timer: number;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ running, recordLapTime, setRunning, resetTimer, timer}) => {
  return (
    <div className="stopWatchButtons">
        <div className="centerMargin">
            {running
                ?<button className="btn stopButton" onClick={() => {setRunning(false)}}>Stop</button>
                :<button className="btn startButton" onClick={() => {setRunning(true)}}>Start</button>}
            <button className={`btn lapButton ${timer == 0 ? 'disabledButton' : 'lapButtonBorder'}`} onClick={() => {recordLapTime()}} disabled={timer == 0}>Lap</button>
            <button className={`btn resetButton ${timer == 0 ? 'disabledButton' : ''}`} onClick={() => {resetTimer()}} disabled={timer == 0}>Reset</button>
        </div>
    </div>    
  );
}

export default StopWatchButton;