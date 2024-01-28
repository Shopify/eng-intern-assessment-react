import React from 'react';

//props for the StopWatch component
interface StopWatchProps {
    time: number;
    laps: { lapNumber: number; lapTime: number; overallTime: number }[];
    formatTime: (time: number) => string;
}
const StopWatch: React.FC<StopWatchProps> = ({ time, laps, formatTime }) => {
    return (
        <div>
            <div className='time-display'>{formatTime(time)}</div> {/* Renders time*/}
            {/* Renders laps if there are any */}
            {laps.length > 0 && (    
                <div>
                    <h3>Laps</h3>
                        {laps.map((lap, index) => (
                            <div key={index}>
                                Lap {lap.lapNumber}: {formatTime(lap.lapTime)} ({formatTime(lap.overallTime)})
                            </div>
                        ))}  
                </div>
            )}
        </div>
    );
};


export default StopWatch;
