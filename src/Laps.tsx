import React from 'react';
import {getTimeDisplayValue} from './util';

interface Props {
    recordedLapTimes: number[];
};

export default function Laps({recordedLapTimes} : Props) {
    if (recordedLapTimes.length > 0) {
        let previousLapTime : number = 0;
        const displayData : string[] = recordedLapTimes.map((recordedLapTime: number) : string => {
            const lapTimeDisplay : string = getTimeDisplayValue(recordedLapTime - previousLapTime);
            previousLapTime = recordedLapTime;
            return lapTimeDisplay;
        });
        return (
            <div>
                Lap : Time  
                <ol>
                    {
                        displayData.map((lapTimeDisplay, index) => <li key = {index}>{lapTimeDisplay}</li>)
                    }
                </ol>
            </div>
        )
    }
}
