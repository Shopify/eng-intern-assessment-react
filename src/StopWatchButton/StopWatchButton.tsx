import React from 'react'
import styles from './StopWatchButton.module.css'

interface StopWatchButtonProps {
    isRunning: boolean;
    onStartStop: () => void;
    onLapReset: () => void;
}

export default function StopWatchButton({isRunning, onStartStop, onLapReset}: StopWatchButtonProps) {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            if (event.currentTarget.id === 'startStopButton') {
                onStartStop();
            } else if (event.currentTarget.id === 'lapResetButton') {
                onLapReset();
            }
        }
    };
    return (
        <div className={styles.buttons}>
            <button tabIndex={0} onKeyDown={handleKeyDown} id="startStopButton" onClick={onStartStop}
                    className={isRunning ? styles.stopButton : styles.startButton}>{isRunning ? 'Stop' : 'Start'}</button>
            <button tabIndex={0} onKeyDown={handleKeyDown} id="lapResetButton" onClick={onLapReset}>{isRunning ? 'Lap' : 'Reset'}</button>
        </div>
    )
}