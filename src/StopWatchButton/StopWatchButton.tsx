import React from 'react'
import styles from './StopWatchButton.module.css'

interface StopWatchButtonProps {
    isRunning: boolean;
    onStartStop: () => void;
    onLapReset: () => void;
}
export default function StopWatchButton({ isRunning, onStartStop, onLapReset }: StopWatchButtonProps) {
    return(
        <div className={styles.buttons}>
            <button onClick={onStartStop} className={isRunning ? styles.stopButton : styles.startButton}>{isRunning ? 'Stop' : 'Start'}</button>
            <button onClick={onLapReset}>{isRunning ? 'Lap' : 'Reset'}</button>
        </div>
    )
}