import React from 'react'
import {StopWatchUIElement} from "@types";
import { StopWatchContext } from '../utils';

export interface stopWatchButton extends StopWatchUIElement{
    type: 'start' | 'stop' | 'reset' | 'lap';
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
        
    return(
        <button
            data-testid = {testId}
            onClick={action}
        >
            {type.toString().charAt(0).toUpperCase() + type.toString().slice(1)}
            {children}
        </button>
    )
}