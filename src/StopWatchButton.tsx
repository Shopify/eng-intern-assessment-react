import React from 'react';
import './styles/StopWatchButton.css'

interface StopWatchButtonProps {
  running?: boolean;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ running }) => {
  return (
    <div className="stopWatchButtons">
        <button className="btn startButton">Start</button>
        <button className="btn lapButton">Lap</button>
        <button className="btn resetButton">Reset</button>
        <button className="btn stopButton">Stop</button>
    </div>    
  );
}

export default StopWatchButton;