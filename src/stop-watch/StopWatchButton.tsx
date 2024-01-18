import React from 'react'
import { StopWatchButtonProps } from '../props/StopWatchButtonProps'

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
            <button title={title} onClick={handleButtonClick}></button>
        </div>
    )
};
