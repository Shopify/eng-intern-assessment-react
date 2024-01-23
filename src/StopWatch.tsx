import React from 'react';

interface StopWatchProps {
    elapsed: number;
    formatTime: (time: number) => string;
    lapTimes: number[];
    lapTimesContainerRef: React.RefObject<HTMLDivElement>;
}

const StopWatch: React.FC<StopWatchProps> = ({ elapsed, formatTime, lapTimes, lapTimesContainerRef }) => {
    return (
        <>
            <div className="timer-container">
                <div className="timer-box">{formatTime(elapsed)}</div>
            </div>
            <h2 className="lap-times-heading">L A P S</h2>
            <div className="lap-times-container" ref={lapTimesContainerRef}>
                <ul className="lap-times-list">
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
