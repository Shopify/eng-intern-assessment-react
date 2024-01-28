import React from 'react';
import '../assets/Style.css';

// interface for StopWatch component
interface StopWatchProps {
    elapsed: number;
    formatTime: (time: number) => string;
    lapTimes: number[];
    lapTimesContainerRef: React.RefObject<HTMLDivElement>;
}

// stopWatch component displaying the elapsed time, lap times, and lap times list
const StopWatch: React.FC<StopWatchProps> = ({ elapsed, formatTime, lapTimes, lapTimesContainerRef }) => {
    return (
        <>
            <div className="timer-container">
                <div className="timer-box">{formatTime(elapsed)}</div>
            </div>

            <h2 className="lap-times-heading">L A P S</h2>

            {/* Container for displaying lap times with a scrollable list */}
            <div className="lap-times-container" ref={lapTimesContainerRef}>
                <ul className="lap-times-list">
                    {/* Mapping lap times to list items */}
                    {lapTimes.map((lap, index) => (
                        <li key={index}>
                            Lap {index + 1}: {formatTime(lap)}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default StopWatch;
