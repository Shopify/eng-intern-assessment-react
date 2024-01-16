import React from 'react'

export default function StopWatchButton({ isRunning, startTimer, pauseTimer, stopTimer, recordLap, clearLaps }: any) {
    return (
        <div>
            <button style={{ background: 'green' }} onClick={startTimer} disabled={isRunning}>Start</button>
            <button style={{ background: 'yellow' }} onClick={pauseTimer} disabled={!isRunning}>Pause</button>
            <button style={{ background: 'red' }} onClick={stopTimer}>Stop</button>
            <button onClick={recordLap} disabled={!isRunning}>Lap</button>
            <button onClick={clearLaps}>Clear Laps</button>
        </div>
    );
};