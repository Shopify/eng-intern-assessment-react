import React, { useState } from 'react'
import TimeDisplay from './TimeDisplay';
import Lap from './Lap';
import StopWatchButton, { ButtonVariant } from './StopWatchButton';
import useTimer, { TimerStatus } from './useTimer';
import { IoMdStopwatch } from "react-icons/io";
import { LuTimerReset } from "react-icons/lu";
import { FaRegStopCircle } from "react-icons/fa";
import { VscDebugRestart } from "react-icons/vsc";

export default function StopWatch() {
    const { time, status, laps, controls } = useTimer();

    // Create different buttons based on the current timer status 
    let buttons: React.ReactNode[] = [];
    if (status === TimerStatus.Unstarted) {
        buttons = [
            <StopWatchButton variant={ButtonVariant.Green} onClick={controls.start}><IoMdStopwatch /> Start</StopWatchButton>,
        ];
    } else if (status === TimerStatus.Running) {
        buttons = [
            <StopWatchButton variant={ButtonVariant.Red} onClick={controls.stop}><FaRegStopCircle /> Stop</StopWatchButton>,
            <StopWatchButton variant={ButtonVariant.Yellow} onClick={controls.reset}><LuTimerReset /> Reset</StopWatchButton>,
        ];
    } else if (status === TimerStatus.Paused) {
        buttons = [
            <StopWatchButton variant={ButtonVariant.Green} onClick={controls.resume}><VscDebugRestart /> Resume</StopWatchButton>,
            <StopWatchButton variant={ButtonVariant.Yellow} onClick={controls.reset}><LuTimerReset /> Reset</StopWatchButton>,
        ]
    }

    // Add a Lap button if the timer is running or paused
    if (status === TimerStatus.Running || status === TimerStatus.Paused) {
        buttons.push(
            <StopWatchButton variant={ButtonVariant.Purple} onClick={controls.addLap}><IoMdStopwatch /> Lap</StopWatchButton>)
    }


    return (
        <div>
            <div className='clock-holder'>
                <div className='stopwatch'>
                    <TimeDisplay time={time} />
                    <div>
                        {...buttons}
                    </div>
                </div>
            </div>
            <Lap laps={laps} />
        </div>
    )
}