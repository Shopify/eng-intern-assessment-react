import React from 'react';
import formatTime from '../utils/formatTime';

interface lapTimesProps {
    lapTimes: number[];
}

const LapTimes = ({ lapTimes }: lapTimesProps) => {
    return (
        <div className='lapTimesContainer digital'>
            <ol data-testid='lapTimes'>
                {lapTimes.map((lap, i) => {
                    return (
                        <li key={i + 1} className='lap'>
                            Lap {i < 9 ? `0${i + 1}` : i + 1}: {formatTime(lap)}
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}

export default LapTimes;