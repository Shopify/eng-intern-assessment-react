import React from 'react';
import './styles/StopWatchButton.scss';

type StopWatchButtonProps = {
    timeInSeconds: number;
    lappedTime: number[];
    stopWatchCounting: boolean;
    handleStartButton: () => void;
    handleStopButton: () => void;
    handleResetButton: () => void;
    handleLapButton: () => void;
};

export default function StopWatchButton(props:StopWatchButtonProps) {

    const {timeInSeconds, lappedTime, stopWatchCounting, handleStartButton, handleStopButton, handleResetButton, handleLapButton} = props;

    return(
        <div className='control_container'>
            <div className='button_container'>
                <button onClick={handleStartButton} className='control_button'>Start</button>
                <button onClick={handleStopButton} className='control_button'>Stop</button>
            </div>
            <div className='button_container'>
                <button onClick={handleResetButton} className='control_button'>Reset</button>
                <button onClick={handleLapButton} className='control_button'>Lap</button>
            </div>
        </div>
    )
}