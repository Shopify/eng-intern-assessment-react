import React from 'react'
import {StopWatchUIElement} from "@types";
import { useButtonTheme  } from './utils';


export interface stopWatchButton extends StopWatchUIElement{
    type: 'Start' | 'Stop' | 'Reset' | 'Lap';
    action: () => void;
    disabled?: boolean;
    textStyles?: React.CSSProperties;
    children?: React.ReactNode;
}

export default function StopWatchButton(
    {
        type,
        action,
        children,
        darkTheme,
        styles,
        testId
    }:stopWatchButton)  {
        
    const {baseNuMorphic} = useButtonTheme(darkTheme);

    return(
        <button
            data-testid = {testId}
            onClick={action}
            style={{...baseNuMorphic as  React.CSSProperties, ...styles}}
        >
            {type.toString()}
            {children}
        </button>
    )
}