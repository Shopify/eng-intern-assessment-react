import React from 'react'
import {StopWatchUIElement} from "@types";
import { useButtonTheme  } from './utils';

/**
 * StopWatchButtonProps interface for the StopWatchButton component.
 *
 * @interface
 * @extends {StopWatchUIElement} - Base UI element for the component.
 *
 * @property {('Start' | 'Stop' | 'Reset' | 'Lap')} type - The type of the button. This is a required property that determines the button's role in the stopwatch functionality.
 * @property {() => void} action - A required property that defines the function to be executed when the button is clicked.
 * @property {ReactNode} children - An optional property for any child nodes to be rendered inside the button.
 * @property {boolean} darkTheme - An optional property that determines whether the button should use a dark theme. Defaults to `false`.
 * @property {React.CSSProperties} styles - An optional property that allows you to pass in custom styles for the button.
 * @property {string} testId - An optional property that sets the `data-testid` attribute of the button for testing purposes.
 * @property {boolean} disabled - An optional property that determines whether the button should be disabled. Defaults to `false`.
 * @property {React.CSSProperties} textStyles - An optional property that allows you to pass in custom styles for the text inside the button.
 */
export interface StopWatchButtonProps extends StopWatchUIElement{
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
    }:StopWatchButtonProps)  {
        
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