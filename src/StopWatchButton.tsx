import React from 'react';
import './StopWatchButton.css';
import { StopWatchButtonProps, ButtonType } from './StopWatch';

export default function StopWatchButton({ type, onClick }: StopWatchButtonProps) {

    // Handler functions
    const handleStart = () => console.log('Starting...');
    const handleStop = () => console.log('Stopping...');
    const handleReset = () => console.log('Resetting...');
    const handleLap = () => console.log('Lap recorded');

    return (
        <div className='button' onClick={onClick}>
            {type}
        </div>
    );
}