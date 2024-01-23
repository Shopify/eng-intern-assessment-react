import React, {ReactNode} from 'react'
import {StopWatchUIElement, stopWatch, AnalogDisplayProps, StopWatchButtonGroupProps, StopWatchLogicComponent, LapDisplayProps} from "@types";
import {useStopWatch,DigitalDisplay,DigitalDisplayProps, AnalogDisplay,} from "."
import { LapDisplay } from './LapDisplay';
// import StopWatchButtonGroupProps from './StopWatchButton/StopWatchButtonGroupProps';
import { useNuMorphicTheme, StopWatchContext,  } from './utils';

/**
 * StopWatchProps interface for the StopWatch component.
 *
 * @interface
 * @extends {StopWatchUIElement} - Base UI element for the component.
 * @extends {StopWatchLogicComponent} - This component extends from StopWatchLogicComponent which includes optional properties related to the logic of the stopwatch.
 * @property {stopWatch} sw - An optional property that allows you to pass in the return from useStopWatch hook allowing accesss to the state of the stopwatch. Defaults to a new instance of useStopWatch.
 * @property {boolean} darkTheme - An optional property that determines whether the stopwatch should use a dark theme. Defaults to `true`.
 * @property {ReactNode} children - The children nodes of the StopWatch component. This is a required property, all children passed in will have access to the StopWatchContext
 */
export interface StopWatchProps extends StopWatchUIElement, StopWatchLogicComponent{
    sw?: stopWatch,
    darkTheme?: boolean,
    children: ReactNode
}

export default function StopWatch({
    sw = useStopWatch({}),
    darkTheme = true,
    containerStyles,
    children
    }:StopWatchProps) {

    const defaultContainer = useNuMorphicTheme(containerStyles,darkTheme);
    return(
        <StopWatchContext.Provider value={{ darkTheme, sw }}>

            <div style={defaultContainer}>
                {children}
            </div>
        </StopWatchContext.Provider>
    )
}


