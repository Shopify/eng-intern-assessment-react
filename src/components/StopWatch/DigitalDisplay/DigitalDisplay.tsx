import React from 'react'
import {StopWatchUIElement, Resolution} from "@types";
import { defaultContainerStyles } from './utils';
import { StopWatchContext } from '../'


/**
 * DigitalDisplayProps interface for the DigitalDisplay component.
 *
 * @interface
 * @extends {StopWatchUIElement} - Base UI element for the component.
 *
 * @property {boolean} isLap - An optional property that determines whether the display is for lap times. Defaults to `false`.
 * @property {React.CSSProperties} digitStyles - An optional property that allows you to pass in custom styles for the digits.
 * @property {number} milliseconds - An optional property that represents the time in milliseconds. If not provided, the time from the `StopWatchContext` will be used.
 * @property {Resolution[]} resolutions - An optional property that represents the resolutions of the time. If not provided, the resolutions from the `StopWatchContext` will be used.
 * @property {boolean} darkTheme - An optional property that determines whether the digital display should use a dark theme. If not provided, the theme from the `StopWatchContext` will be used.
 */
export interface DigitalDisplayProps extends StopWatchUIElement{
    isLap?: boolean;
    digitStyles?: React.CSSProperties;
    milliseconds?: number;
    resolutions?: Resolution[];
}
export function DigitalDisplay({
    isLap = false,
    containerStyles,
    digitStyles,
    milliseconds,
    resolutions,
    darkTheme,
    ...rest
    }:DigitalDisplayProps) {
    
    if(resolutions === undefined){ resolutions = React.useContext(StopWatchContext).sw.resolutions}
    if(darkTheme === undefined){ darkTheme = React.useContext(StopWatchContext).darkTheme}
    if(milliseconds === undefined){ milliseconds = React.useContext(StopWatchContext).sw.milliseconds}
   
    const defaultTextStyles: React.CSSProperties = {
        color:darkTheme ? "#c0c0c0" : "#333",
    }

    const finalDigitStyles = digitStyles ? {...defaultTextStyles, ...digitStyles} : defaultTextStyles;
    

    if(!isLap){    
        return(
            <div
                data-testid="digital-display-container"
                style={{...defaultContainerStyles,...containerStyles,}}
            >
                {resolutions.map((resolution, index) => {
                    return (
                        <h1 data-test data-testid={`digital-display-item-${index}`} style={finalDigitStyles} key={index}>
                            {index !== 0
                                ? resolution.modulus === 100
                                    ? "."
                                    : ":"
                                : ""}
                            {(
                                Math.floor(milliseconds / resolution.divisor) %
                                resolution.modulus
                            )
                                .toString()
                                .padStart(2, "0")}
                        </h1>
                    );
                })}
            </div>
        )
    }

    return (
        <div
            data-testid="lap-display-container"
            style={{...defaultContainerStyles,...containerStyles}}
        >
        {resolutions.map((resolution, index:number) => {
            return (
                <h4 data-test data-testid={`digital-display-item-${index}`} style={finalDigitStyles} key={index}>
                    {index !== 0
                        ? resolution.modulus === 100
                            ? "."
                            : ":"
                        : ""}
                    {(
                        Math.floor(milliseconds / resolution.divisor) %
                        resolution.modulus
                    )
                        .toString()
                        .padStart(2, "0")}
                </h4>
            );
        })}
    </div>
    )
}