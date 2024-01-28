import React from 'react'

interface stopWatchProps {
    time: number
}

const StopWatch = ({time} : stopWatchProps) => {
    const formatTime = (timeInMilliseconds: number) => {
        const minutes = Math.floor((timeInMilliseconds % 3600000) / 60000);
        const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
        const milliseconds = Math.floor((timeInMilliseconds % 1000) / 10);

        const doubleDigits = (input: number) => {
            const output = input < 10 ? `0${input}` : input;
            return output;
        };

        return `${doubleDigits(minutes)}:${doubleDigits(seconds)}.${doubleDigits(milliseconds)}`;
    }

    return(
        <p className='timeDisplay digital'>{formatTime(time)}</p>
    )
}

export default StopWatch;