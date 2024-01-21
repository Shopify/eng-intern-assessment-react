import React from 'react'
import {StopWatchUIElement, Resolution, stopWatch} from "@types";
import { defaultContainerStyles } from './utils';
import { StopWatchContext } from '../'
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