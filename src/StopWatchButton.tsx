import React, { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

type StopWatchButtonProps = {
    timeInSeconds: number;
    handleStartButton: () => void;
    handleStopButton: () => void;
    handleResetButton: () => void;
};

export default function StopWatchButton(props:StopWatchButtonProps) {
    const {timeInSeconds, handleStartButton, handleStopButton, handleResetButton} = props;


    return(
        <div className='control_container'>
            <button
                onClick={handleStartButton} id="start_button"
                className='control_button'>
                    Start
                </button>
            <button onClick={handleStopButton} className='control_button'>Stop</button>
            <button onClick={handleResetButton} className='control_button'>Reset</button>
            {/* <button onClick={handleLapButton} className='control_button'>Lap</button> */}
        </div>
    )
}