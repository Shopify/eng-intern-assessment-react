import React from 'react'

export default function StopWatch() {
    return(
        <div className='Stopwatch'>
            <div >Stopwatch</div>
            <div >Time: {formatHMS(0)}</div>
        </div>
    )
}

function formatHMS (timeInSeconds: number) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds) % 60;
    const fraction = Math.floor((timeInSeconds - Math.floor(timeInSeconds)) * 100);

    const formattedTime = `${
        String(hours).padStart(2, "0")}:${
        String(minutes).padStart(2, "0")}:${
        String(seconds).padStart(2, "0")}.${
        String(fraction).padStart(2, "0")}`;

    return formattedTime;
};