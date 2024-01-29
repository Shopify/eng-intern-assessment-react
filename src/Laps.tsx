import React from 'react';
import {getTimeDisplayValue} from './util';

interface Props {
    recordedLapTimes: number[];
};

export default function Laps({recordedLapTimes} : Props) {
    if (recordedLapTimes.length > 0) {
        return (
            <div>
                Lap :
                <ol>
                    {
                        recordedLapTimes.map((recordedLapTime, index) => <li key = {index}>{getTimeDisplayValue(index === 0 ? recordedLapTime : recordedLapTimes[index] - recordedLapTimes[index - 1])}</li>)
                    }
                </ol>
            </div>
        )
    }
}
