import React from 'react'
import { StopWatchController, useStopWatch } from './hooks'
import { StopWatchUIElement } from '@types'
import { StopWatchContext } from './utils'
export interface StopWatchProps extends StopWatchUIElement{
    sw?: StopWatchController,
    darkTheme?: boolean,
    children: React.ReactNode
}

export default function StopWatch({
    children,
    darkTheme,
    containerStyles,
    sw = useStopWatch({})

}:StopWatchProps) {

    return(
        <StopWatchContext.Provider value={{darkTheme:darkTheme, sw:sw}}>
        <div style={containerStyles}>
            <button onClick={sw.actions.start}>Start</button>
            <button onClick={sw.actions.stop}>Stop</button>
            <button onClick={sw.actions.reset}>Reset</button>
            {sw.milliseconds}
            {children}
        </div>
        </StopWatchContext.Provider>
    )
}