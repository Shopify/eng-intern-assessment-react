import React from 'react';
import { Time } from './useTimer';

const formatTimeUnit = (timeUnit: number) => {
    return timeUnit < 10 ?  `0${timeUnit}` : timeUnit;
  }

const formatTime = (time: Time) => `${formatTimeUnit(time.h)}:${formatTimeUnit(time.m)}:${formatTimeUnit(time.s)}.${formatTimeUnit(time.ms)}`;

const Lap = ({ laps }: { laps: Time[] }) => {
    return (
        <div className="lap-container">
            <h3>Laps</h3>
            <ul className='lap-list'>
                {laps.slice().reverse().map((lap, index) => (
                    <li key={index}>{formatTime(lap)}</li>
                ))}
            </ul>
        </div>
    );
};

export default Lap;