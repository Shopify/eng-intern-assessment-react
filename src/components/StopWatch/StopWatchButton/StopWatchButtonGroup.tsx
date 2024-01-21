import React from 'react'
import {StopWatchUIElement, StopWatchLogicComponent} from "@types";
import StopWatchButton from './StopWatchButton';
import { baseContainer } from './utils';
import { StopWatchContext } from '../'
export interface StopWatchButtonGroupProps extends StopWatchUIElement, StopWatchLogicComponent {
    startButtonStyles?: React.CSSProperties;
    stopButtonStyles?: React.CSSProperties;
    resetButtonStyles?: React.CSSProperties;
    lapButtonStyles?: React.CSSProperties;

}

export function StopWatchButtonGroupProps(
    {
        startButtonStyles,
        stopButtonStyles,
        resetButtonStyles,
        lapButtonStyles,
        containerStyles,
        darkTheme,
        running,
        actions
    }:StopWatchButtonGroupProps)  {

        // const {darkTheme, sw:{running, actions}} = React.useContext(StopWatchContext);
        if(darkTheme===undefined){ darkTheme = React.useContext(StopWatchContext).darkTheme}
        if(running===undefined){ running = React.useContext(StopWatchContext).sw.running}
        if(!actions){ actions = React.useContext(StopWatchContext).sw.actions}

        const startStopButtonProps = {
            styles: running ? stopButtonStyles : startButtonStyles,
            type: running ? 'Stop' : 'Start' as 'Start' | 'Stop' | 'Reset' | 'Lap',
            action: running ? actions.stop : actions.start,
        }

    return(
        <div className='sw-button-group-container' style={{...baseContainer, ...containerStyles}}>
            <StopWatchButton darkTheme={darkTheme} type={startStopButtonProps.type} action={startStopButtonProps.action} styles={startStopButtonProps.styles} />
            <StopWatchButton darkTheme={darkTheme} type={'Reset'} action={actions.reset} styles={resetButtonStyles}/>
            <StopWatchButton darkTheme={darkTheme} type={'Lap'} action={actions.lap} styles={lapButtonStyles}/>
        </div>
    )
}