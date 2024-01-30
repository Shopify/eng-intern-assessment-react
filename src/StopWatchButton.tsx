import React from 'react';
import './appstyles.css';

interface StopWatchButtonProps {
    isRunning: boolean;
    onStartStopClick: () => void;
    onResetClick: () => void;
    onLapClick: () => void;
}

export default function StopWatchButton({
    isRunning,
    onStartStopClick,
    onResetClick,
    onLapClick
}: StopWatchButtonProps) {
    return (
    <div style={{display:'flex'}}>
      <button className="startstop-button"  onClick={onStartStopClick}>{isRunning ? 'STOP' : 'START'}</button>
      <button className="reset-button"  onClick={onResetClick}>RESET</button>
      <button className="lap-button"  onClick={onLapClick}>LAP</button>
    </div>
    )
}