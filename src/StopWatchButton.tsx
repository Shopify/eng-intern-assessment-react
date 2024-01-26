import React, { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

type StopWatchButtonProps = {
    timeInSeconds: number;
    handleStartButton: () => void
};

export default function StopWatchButton(props:StopWatchButtonProps) {
    const {timeInSeconds, handleStartButton} = props;


    return(
        <div className='control_container'>
            <button
                onClick={handleStartButton} id="start_button"
                className='control_button'>
                    Start
                </button>
            {/* <button onClick={handleStopButton} className='control_button'>Stop</button>
            <button onClick={handleResetButton} className='control_button'>Reset</button> */}
        </div>
    )
}