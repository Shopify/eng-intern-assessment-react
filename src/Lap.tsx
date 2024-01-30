import React from 'react';
import { Time } from './useTimer';
import { padNum } from './utils';

// Helper function to format the entire time object as a string
const formatTime = (time: Time) => `${padNum(time.h)}:${padNum(time.m)}:${padNum(time.s)}.${padNum(time.ms)}`;

// Lap renders a list of lap times
const Lap = ({ laps }: { laps: Time[] }) => {
    return (
        <div className="lap-container">
            <h3>Laps</h3>
            <ul className='lap-list'>
                {/* Latest lap times are displayed at the top */}
                {laps.slice().reverse().map((lap, index) => (
                    <li key={index}>{formatTime(lap)}</li>
                ))}
            </ul>
        </div>
    );
};

export default Lap;