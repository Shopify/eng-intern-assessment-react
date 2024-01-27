import React from 'react'
import formatTime from '../utils/FormatTime';

// Interface for StopWatch props
interface StopWatchProps {
    timeElapsed: number;
}

const StopWatch: React.FC<StopWatchProps> = ({ timeElapsed}) => {
    // Component for the stopwatch display
    // Note: changed to absolute positioning to prevent the time display from shaking due to inconsistent widths of characters
    
    // ========== RENDERING ==============
    return (
        <>
            <h2 data-testid="time-display"
            className='font-bold text-[5rem] text-center absolute left-[3.1rem]'
            >
                {formatTime(timeElapsed)}
            </h2>
        </>
    );
};

export default StopWatch;