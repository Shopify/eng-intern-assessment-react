import React, { ReactComponentElement } from 'react'
import { StopWatchButtonProps } from '../../props/StopWatchButtonProps'
import {buttonStyles} from '../../styles/StopWatchStyles';

export default function StopWatchButton(
    {
        title,
        callback
    }: StopWatchButtonProps) {

    const handleButtonClick = () => {
        callback();
    };

    return(
        <div className='stopwatch-button'>
            <button title={title} onClick={handleButtonClick} style={buttonStyles.stopwatchButton}>{title}</button>
        </div>
    )
};
