import React from 'react'

/**
 * Defines the type for the properties accepted by the StopWatchButton component.
 * @property {string} name - The name of the button, which will be displayed as the button text.
 * @property {() => void} onClick - Optional click event handler for the button.
 * @property {boolean} isDisabled - Optional flag to disable the button.
 */
type StopWatchButtonProps = {
    name: string;
    onClick?: () => void;
    isDisabled?: boolean; 
    className?:string; 
};
  
/**
 * A functional component that renders a button for the stopwatch.
 * @param {StopWatchButtonProps} props - The props for this component.
 * @returns A React element representing a button.
 */
  export default function StopWatchButton({ name, onClick, isDisabled, className }: StopWatchButtonProps) {
    // Rendering the button element
    // - The 'onClick' prop is used to handle click events on the button.
    // - 'aria-label' is set for accessibility, making the button more accessible to screen readers.
    // - The 'disabled' prop determines whether the button is disabled.
    // - The button text is set to the value of the 'name' prop.
    return(
        <button className={className} onClick={onClick} aria-label={name} disabled={isDisabled}>{name}</button>
    )
}