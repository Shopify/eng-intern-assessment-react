// Responsible for time display
import React, {useState, useEffect} from 'react'

interface Props {
    elapsedTime: number
}
export default function StopWatch({elapsedTime}: Props) {

    const padZero = (n : number) => {
        if (n < 10) {
            return `0${n}`
        }

        return `${n}`
    }

    const formatTime = (time: number) => {

        let seconds = padZero(Math.floor(time / 1000) % 60);
        let minutes = padZero(Math.floor(time / 1000 / 60));
        let milliseconds = padZero(Math.floor((time % 1000) / 10));

        return `${minutes}:${seconds}.${milliseconds}`
    }
    return(
        <div>{formatTime(elapsedTime)}</div>
    )
}