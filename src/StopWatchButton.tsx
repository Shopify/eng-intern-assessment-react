import React from 'react';
import './styles/StopWatchButton.css'

// Defining interface for the component props
interface StopWatchButtonProps {
  running?: boolean;
  recordLapTime: () => void;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
  resetTimer: () => void;
  timer: number;
}

// Component to manage Start, Reset, Stop and Lap features wired with the stopwatch timer
const StopWatchButton: React.FC<StopWatchButtonProps> = ({ running, recordLapTime, setRunning, resetTimer, timer}) => {
  return (
    <div className="stopWatchButtons">
        <div className="centerMargin">
            {running
                ?<>
                    <button className="btn lapButton" onClick={() => {recordLapTime()}}>Lap</button>                
                    <button className="btn stopButton" onClick={() => {setRunning(false)}}>Stop</button>
                </>
                :<>
                    <button className={`btn resetButton ${timer == 0 ? 'disabledButton' : ''}`} onClick={() => {resetTimer()}} disabled={timer == 0}>Reset</button>
                    <button className="btn startButton" onClick={() => {setRunning(true)}}>Start</button>
                </>
                }
        </div>
    </div>    
  );
}

export default StopWatchButton;