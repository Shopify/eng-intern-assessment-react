import React, { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

type StopWatchButtonProps = {
    timeInSeconds: number;
    lappedTime: number[];
    handleStartButton: () => void;
    handleStopButton: () => void;
    handleResetButton: () => void;
    handleLapButton: () => void;
};

export default function StopWatchButton(props:StopWatchButtonProps) {

    const {timeInSeconds, lappedTime, handleStartButton, handleStopButton, handleResetButton, handleLapButton} = props;

    return(
        <div className='control_container'>
            <button onClick={handleStartButton} className='control_button'>Start</button>
            <button onClick={handleStopButton} className='control_button'>Stop</button>
            <button onClick={handleResetButton} className='control_button'>Reset</button>
            <button onClick={handleLapButton} className='control_button'>Lap</button>
        </div>
    )
}