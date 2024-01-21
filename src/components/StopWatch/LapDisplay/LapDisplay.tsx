import React from 'react'
import {StopWatchUIElement, Resolution, stopWatch} from "@types";


import { defaultListItemStyle,defaultLapListStyle } from './utils';
import {DigitalDisplay, DigitalDisplayProps} from '../DigitalDisplay/';
import { StopWatchContext } from '../'
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
                        <h4 style={{...labelStyles ,...digitStyles}}>lap {index+1}{ '\u00A0'}</h4>
                        <DigitalDisplay {...DigitalDisplayProps} milliseconds={lap} isLap darkTheme={darkTheme} />
                    </li>
                )
            })
        }
    </ol>
        </div>
    )
}