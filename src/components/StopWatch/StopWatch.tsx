import React, {ReactNode} from 'react'
import {StopWatchUIElement, stopWatch, AnalogDisplayProps, StopWatchButtonGroupProps, StopWatchLogicComponent, LapDisplayProps} from "@types";
import {useStopWatch,DigitalDisplay,DigitalDisplayProps, AnalogDisplay,} from "."
import { LapDisplay } from './LapDisplay';
// import StopWatchButtonGroupProps from './StopWatchButton/StopWatchButtonGroupProps';
import { useNuMorphicTheme, StopWatchContext,  } from './utils';

export interface StopWatchProps extends StopWatchUIElement, StopWatchLogicComponent{
    sw?: stopWatch,
    darkTheme?: boolean,
    children: ReactNode
}
// export const StopWatchContext = React.createContext<{darkTheme:boolean,sw:stopWatch}>(null);

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


