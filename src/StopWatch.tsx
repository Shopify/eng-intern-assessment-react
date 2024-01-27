import React from 'react';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
    const startTimer = () => {};
    const stopTimer = () => {};
    const lapTimer =() => {};
    const resetTimer = () => {};

    return(
        <>
            <div>00:00:00.00</div>
            <StopWatchButton disabled ={false} action = {startTimer} label = 'Start'/>
            <StopWatchButton disabled={true} action = {stopTimer} label ='Stop'/>
            <StopWatchButton disabled = {true} action = {lapTimer} label = 'Lap'/>
            <StopWatchButton disabled = {false} action = {resetTimer} label='Reset'/>
        </>
    )
}