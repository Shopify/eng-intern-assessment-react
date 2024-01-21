import React from 'react'
import {AnalogProps, StopWatchUIElement } from "@types";
import { useAnalogClock, centerIconStyle } from './utils';
import {Complication} from './Complication';

import { StopWatchContext } from '../'

export interface AnalogDisplayProps extends StopWatchUIElement, AnalogProps{
    clockStyle?: React.CSSProperties;
    backgroundImage?: string;
    secondHandStyle?: React.CSSProperties;
    ComplicationProps?: any;
    complicationSize?: number;
    borderWidth?: number;
    faceColor?: string;
    milliseconds?:number,
    laps?: number[],
}
export function AnalogDisplay({
    containerStyles,
    backgroundImage,
    clockStyle,
    secondTicks = true,
    borderColor = '#343232',
    styles,
    faceColor,
    complication,
    ComplicationProps,
    clockSize = 300,
    borderWidth= 12,
    borderRadius = "100%",
    milliseconds,
    laps,
    darkTheme,
    }:AnalogDisplayProps) {
    

    if(darkTheme === undefined){ darkTheme = React.useContext(StopWatchContext).darkTheme}
    if(!milliseconds){ milliseconds = React.useContext(StopWatchContext).sw.milliseconds}
    if(!laps){ laps = React.useContext(StopWatchContext).sw.laps}


    const secondHandLength = clockSize / 2;
    const secondHandShift = secondHandLength * 0.15;

    const {finalContainerStyle, finalClockStyle, secondHandStyle, lapHandStyle} = useAnalogClock({
        darkTheme,
        containerStyles,
        backgroundImage,
        milliseconds,
        clockStyle,
        secondTicks,
        borderColor,
        styles,
        faceColor,
        complication,
        clockSize,
        borderWidth,
        borderRadius,
        laps,
        secondHandLength,
        secondHandShift
    })


    return(
        <div data-testid="analog-clock-container" className='analog-clock-container' style={finalContainerStyle}>
            <div style={finalClockStyle as React.CSSProperties} className='clock' data-testid="clock" />
            <Complication {...ComplicationProps} milliseconds={milliseconds} darkTheme={darkTheme} complication={complication} data-testid='complication' />
            <div style={secondHandStyle as React.CSSProperties} className='hand second-hand' data-testid='second-hand' />
            {laps && laps.length > 0
                    ? <div style={lapHandStyle as React.CSSProperties} className='hand lap-hand' data-testid='lap-hand' />
                    : null
            }
            <div style={centerIconStyle as React.CSSProperties} className='centerIcon'/>
        </div>
    )
}