import React from 'react';
import './styles/StopWatch.css';

interface StopWatch {
    watchtime: number;
    laps: number[];
  }

// Stopwatch screen component
export default function StopWatch({ watchtime, laps }: StopWatch) {

const timecalc = (centiseconds: number): string => { //calculates and formats the stop watch time given centiseconds as input
    const hours = Math.floor(centiseconds / 360000); // 1 hour = 3600 seconds * 100 centiseconds
    const minutes = Math.floor((centiseconds % 360000) / 6000); // 1 minute = 60 seconds * 100 centiseconds
    const seconds = Math.floor((centiseconds % 6000) / 100); // 1 second = 100 centiseconds
    
    const stringHours = String(hours).padStart(2, '0');
    const stringMinutes = String(minutes).padStart(2, '0');
    const stringSeconds = String(seconds).padStart(2, '0');

    if (hours === 0) //only show hours if there is hours to show, avoiding padding 0s for hours
    {
        return `${stringMinutes}:${stringSeconds}`;
    }
    else
    {
        return `${stringHours}:${stringMinutes}:${stringSeconds}`;
    }
};

return (
    <div>
        <div className="stopwatch-time">
            <span className="main-time">{timecalc(watchtime)}</span>
            <span className="centiseconds">.{String(Math.floor(watchtime % 100 / 10)).padStart(1, '0')}</span> {/*calculates deciseconds and displays in different font size*/}
        </div> 
        
        {laps.length > 0 && ( //displays laps in a table below the stopwatch time
        <div>
            <table className="stopwatch-table">
            <thead>
                <tr>
                <th>Lap</th>
                <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {laps.slice().reverse().map((lap, index) => ( //reverses the lap array so that the latest laps appear first in the list
                <tr key={index}>
                    <td>{laps.length - index}</td>
                    <td>{timecalc(lap)}.{String(lap % 100).padStart(2, '0')}</td>
                </tr>
                ))}
            </tbody>
            </table> 
        </div>
        )}
    </div>
    );
}