import React from 'react'
import formatTime from '../utils/FormatTime';

// Interface for StopWatch props
interface StopWatchProps {
    timeElapsed: number;
    isRunning: boolean;
}

const StopWatch: React.FC<StopWatchProps> = ({ timeElapsed, isRunning }) => {
    // Component for the stopwatch display
    // Note: timeElapsed changed to absolute positioning to prevent the time display from shaking due to inconsistent widths of characters
    
    // ========== RENDERING ==============
    return (
        <div id='stopwatch-display'
            className='bg-black text-white rounded-full shadow-black/40 shadow-lg
            w-[28rem] h-[28rem] min-h-[14rem] flex flex-col justify-center items-center
            mt-4 mb-7 transition-transform duration-300 transform-gpu hover:scale-105
            relative'>
            
            {/* TIME ELAPSED DISPLAY*/}
            <h2 id="time-display" data-testid="time-display"
            className='font-bold text-[3.5rem] text-center absolute left-[3.5rem]'>
                {formatTime(timeElapsed)}
            </h2>

            {/* PAUSED LABEL -- when stopwatch has been run and stopped */}
            {!isRunning && timeElapsed > 0 &&
                <p id='paused-label' data-testid='paused-label'
                className='text-xl absolute translate-y-[4rem]'>
                    Paused
                </p>
            }

        </div>
    );
};

export default StopWatch;