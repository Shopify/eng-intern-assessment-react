/**
 * @author Jaza Khan <jaza-k@protonmail.com>
 */

import React from 'react';
import Button from '@mui/material/Button';

interface StopwatchButtonProps {
    onStart: () => void; 
    onStop: () => void;   
    onReset: () => void; 
    onLap: () => void;    
}

const StopwatchButton: React.FC<StopwatchButtonProps> = ({ onStart, onStop, onReset, onLap }) => {
    return (
        <div>
            <Button onClick={onStart}>Start</Button>
            <Button onClick={onStop}>Stop</Button>
            <Button onClick={onReset}>Reset</Button>
            <Button onClick={onLap}>Lap</Button>
        </div>
    );
};

export default StopwatchButton;

