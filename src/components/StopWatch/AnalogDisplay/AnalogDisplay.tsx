import React from 'react'
import {AnalogProps, StopWatchUIElement } from "@types";
import { useAnalogClock, centerIconStyle, useAnalogContainerStyles} from './utils';
import {Complication} from './Complication';

import { StopWatchContext } from '../'

/**
 * AnalogDisplayProps interface for the AnalogDisplay component.
 *
 * @interface
 * @extends {StopWatchUIElement} - Base UI element for the component.
 * @extends {AnalogProps} - This component extends from AnalogProps which includes optional properties related to the analog display of the stopwatch.
 *
 * @property {React.CSSProperties} clockStyle - An optional property that allows you to pass in custom styles for the clock.
 * @property {string} backgroundImage - An optional property that sets the background image of the clock.
 * @property {React.CSSProperties} secondHandStyle - An optional property that allows you to pass in custom styles for the second hand.
 * @property {any} ComplicationProps - An optional property that allows you to pass in props for the Complication component.
 * @property {number} complicationSize - An optional property that sets the size of the complication.
 * @property {number} borderWidth - An optional property that sets the border width of the clock. Defaults to `12`.
 * @property {string} faceColor - An optional property that sets the color of the clock face.
 * @property {number} milliseconds - An optional property that represents the time in milliseconds. If not provided, the time from the `StopWatchContext` will be used.
 * @property {number[]} laps - An optional property that represents the lap times. If not provided, the lap times from the `StopWatchContext` will be used.
 * @property {boolean} darkTheme - An optional property that determines whether the analog display should use a dark theme. If not provided, the theme from the `StopWatchContext` will be used.
 */
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




    const { secondHandStyle, lapHandStyle, } = useAnalogClock({
        milliseconds,
        clockSize,
        laps
    })
    const {finalClockStyle, finalContainerStyle} = useAnalogContainerStyles({
        containerStyles,
        faceColor,
        darkTheme,
        clockSize,
        borderWidth,
        borderColor,
        borderRadius,
        backgroundImage,
        secondTicks,
        clockStyle,
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