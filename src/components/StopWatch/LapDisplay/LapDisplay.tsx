import React from 'react'
import {StopWatchUIElement, Resolution, stopWatch} from "@types";


import { defaultListItemStyle,defaultLapListStyle } from './utils';
import {DigitalDisplay, DigitalDisplayProps} from '../DigitalDisplay/';
import { StopWatchContext } from '../'


/**
 * LapDisplayProps interface for the LapDisplay component.
 *
 * @interface
 * @extends {StopWatchUIElement} - Base UI element for the component.
 *
 * @property {React.CSSProperties} digitStyles - An optional property that allows you to pass in custom styles for the digits.
 * @property {React.CSSProperties} orderedListStyles - An optional property that allows you to pass in custom styles for the ordered list.
 * @property {React.CSSProperties} orderedListItemStyles - An optional property that allows you to pass in custom styles for the items in the ordered list.
 * @property {Partial<DigitalDisplayProps>} DigitalDisplayProps - An optional property that allows you to pass in props for the DigitalDisplay component.
 * @property {number[]} laps - An optional property that represents the lap times. If not provided, the lap times from the `StopWatchContext` will be used.
 * @property {Resolution[]} resolutions - An optional property that represents the resolutions of the lap times. If not provided, the resolutions from the `StopWatchContext` will be used.
 * @property {boolean} darkTheme - An optional property that determines whether the lap display should use a dark theme. If not provided, the theme from the `StopWatchContext` will be used.
 * By default number, Resolution, and darkTheme are pulled from the StopWatchContext
 */
export interface LapDisplayProps extends StopWatchUIElement{
    digitStyles?: React.CSSProperties;
    orderedListStyles?: React.CSSProperties;
    orderedListItemStyles?: React.CSSProperties;
    DigitalDisplayProps?: Partial<DigitalDisplayProps>;
    laps?: number[];
    resolutions?: Resolution[];
    darkTheme?: boolean;

}

export function LapDisplay({
    containerStyles,
    digitStyles,
    orderedListStyles,
    orderedListItemStyles,
    DigitalDisplayProps,
    laps,
    resolutions,
    darkTheme,
}:LapDisplayProps) {

   
    if(laps === undefined){ laps = React.useContext(StopWatchContext).sw.laps}
    if(resolutions === undefined){ resolutions = React.useContext(StopWatchContext).sw.resolutions}
    if(darkTheme === undefined){ darkTheme = React.useContext(StopWatchContext).darkTheme}
    

    const labelStyles: React.CSSProperties = {
		fontSize:"1rem",
		fontWeight:"bold",
		margin:"0",
        marginTop:"0px",
        marginBottom:"0px",
        color:darkTheme ? "#c0c0c0" : "#333",
	}

    return (
        <div data-testid="lap-display-wrapper" style={
            {
                display:"flex",
                flexDirection:"column",
                alignItems:"apart",
                width:"100%",
                ...containerStyles
            }
        }>

            <ol style={{...defaultLapListStyle,...orderedListStyles}} className={'lapDisplay'}>
                {
                    laps.map((lap, index) => {
                        return (
                            <li style={{...defaultListItemStyle}} key={index}>
                                <h4 style={{...labelStyles ,...digitStyles}}>lap {index+1} {' '}</h4>
                                <DigitalDisplay {...DigitalDisplayProps} milliseconds={lap} isLap darkTheme={darkTheme} />
                            </li>
                        )
                    })
                }
            </ol>
        </div>
    )
}