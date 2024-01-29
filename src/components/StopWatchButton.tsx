import React from 'react';

interface buttonProps {
    name: string;
    stopwatchState: string;
    handleButtonClick: () => void;
}

const StopWatchButton = ({ name, stopwatchState, handleButtonClick }: buttonProps) => {
    // certain buttons should be disabled depending on the stopwatch state
    // disabled button conditions:
        // disable all buttons except the start button when the stopwatch has been reset (default)
        // disable only the start button when the stopwatch is running
        // disable only the stop button when the stopwatch is stopped/paused
    if (
        (stopwatchState === 'reset' && name !== 'start')
        || (stopwatchState === 'started' && name === 'start')
        || (stopwatchState === 'stopped' && name === 'stop')
    ) {
        return (
            <button className='digital' onClick={handleButtonClick} disabled>{name}</button>
        )
    // if the none of the above conditions are met, render a normal/non-disabled button
    } else return (
        <button className='digital' onClick={handleButtonClick}>{name}</button>
    )
}

export default StopWatchButton;