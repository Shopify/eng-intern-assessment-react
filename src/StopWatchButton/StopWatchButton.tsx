import React from 'react'
import styles from './StopWatchButton.module.css'

interface StopWatchButtonProps {
    isRunning: boolean;
    onStartStop: () => void;
    onReset: () => void;
}
export default function StopWatchButton({ isRunning, onStartStop, onReset }: StopWatchButtonProps) {
    return(
        <div className={styles.buttons}>
            <button onClick={onStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
            <button onClick={onReset}>Reset</button>
        </div>
    )
}