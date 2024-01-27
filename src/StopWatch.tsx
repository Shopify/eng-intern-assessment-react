import React from 'react'
import formatTime from '../utils/FormatTime';

// Interface for StopWatch props
interface StopWatchProps {
    timeElapsed: number;
}

const StopWatch: React.FC<StopWatchProps> = ({ timeElapsed}) => {
    // Component for the stopwatch display
    
    // ========== RENDERING ==============
    return (
        <>
            <h2 data-testid="time-display"
            className='font-bold text-[5rem]'
            >
                {formatTime(timeElapsed)}
            </h2>
        </>
    );
};

export default StopWatch;