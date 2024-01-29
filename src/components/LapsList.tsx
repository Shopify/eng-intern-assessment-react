import React from 'react';
import '../assets/css/LapsList.css';

type LapsListProps = {
    getTimeFormatHelper: (time: number) => string,
    laps: Array<number>,
    maxLapTime: number,
    minLapTime: number
}

export default function LapsList({ getTimeFormatHelper, laps, minLapTime, maxLapTime }: LapsListProps) {
    // sets the style for best and worst times, best is green, worst is red
    const getClassNameLapDetailsHelper = (lapTime: number): string => {
        return lapTime === minLapTime && laps.length > 1 ? "min" : lapTime === maxLapTime && laps.length > 1 ? "max" : "";
    }

    return (
        <div className="lap-container">{laps.map((lapTime, i) =>
            <div data-testid='lap' key={i + lapTime} className={`lap-details ${getClassNameLapDetailsHelper(lapTime)}`}>
                <div>{`Lap ${laps.length - i}`}</div>
                <div>{getTimeFormatHelper(lapTime)}</div>
            </div>)}
        </div>
    )
}