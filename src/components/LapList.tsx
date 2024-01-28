import React from 'react';
import LapTiming from './LapTiming';
import './LapList.css';

export default function LapList ({laps}: { laps: Array<number>}) {
    const showLapTime = laps.length > 0;

    return(
        <div className='lap-list'>
            {showLapTime && 
            laps.map ((lapTime, index) => (
                <LapTiming index={index} key={index} lapTime={lapTime}/>
            ))}
        </div>
    )
}