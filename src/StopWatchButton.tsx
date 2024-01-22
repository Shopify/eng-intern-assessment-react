import React from 'react'

interface StopWatchButtonProps {
    isRunning: boolean;
    onStartStopClick: () => void;
    onResetClick: () => void;
}

export default function StopWatchButton({
    isRunning,
    onStartStopClick,
    onResetClick
}: StopWatchButtonProps) {
    return (
    <div>
      <button onClick={onStartStopClick}>{isRunning ? 'Stop' : 'Start'}</button>
      <button onClick={onResetClick}>Reset</button>
    </div>
    )
}