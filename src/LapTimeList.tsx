import React from 'react';
import { formatTime } from './utils';
import './assets/lapTimeList.css';


interface LapTimeListProps {
    laps: number[];
}

const LapTimeList: React.FC<LapTimeListProps> = ({ laps }) => {
    return (
        <div className='lap-times'>
            {laps.map((lapTime, index) => {
                return (
                    <div className="lap-row" key={index}>
                        <span className='lap-times__lap-number'>Lap {index + 1}</span>
                        <span className='lap-times__lap-time'>{formatTime(lapTime)}</span>
                    </div>
                )
            })}
        </div>
    );
};

export default LapTimeList;
