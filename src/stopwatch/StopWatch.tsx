import React, { useMemo } from 'react';

type StopWatchProps = {
    elapsedTime: number;
    laps: number;
};

function formatTwoDigits(num: number) {
    let result = Math.floor(num).toString();
    if (result.length == 1) {
        result = '0' + result;
    }
    return result;
}

export default function StopWatch({ elapsedTime }: StopWatchProps) {
    const timeString = useMemo(
        () => `${formatTwoDigits(elapsedTime / 60)}:${formatTwoDigits(elapsedTime % 60)}.${formatTwoDigits((elapsedTime - Math.floor(elapsedTime)) * 100)}`,
        [elapsedTime],
    );
    return (
        <div>
            <span>{timeString}</span>
        </div>
    );
}
