import React from 'react';

interface buttonProps {
    name: string;
    stopwatchState: string;
    handleButtonClick: () => void;
}

const StopWatchButton = ({ name, stopwatchState, handleButtonClick }: buttonProps) => {
    if (
        (stopwatchState === 'reset' && name !== 'start')
        || (stopwatchState === 'started' && name === 'start')
        || (stopwatchState === 'stopped' && name === 'stop')
    ) {
        return (
            <button className='digital' onClick={handleButtonClick} disabled>{name}</button>
        )
    } else return (
        <button className='digital' onClick={handleButtonClick}>{name}</button>
    )
}

export default StopWatchButton;