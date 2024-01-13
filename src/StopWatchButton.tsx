import React from 'react';
import { StopWatchButtonProps } from './StopWatch';

/**
 * The StopWatchButton component renders a button for the stopwatch.
 * It takes props for the button type and an onClick event handler.
 *
 * @param {ButtonType} props.type - The type of the button, which determines its label.
 * @param {Function} props.onClick - The function to be called when the button is clicked.
 */
export default function StopWatchButton({ type, onClick }: StopWatchButtonProps) {
    return (
        <div className='button' onClick={onClick}>
            {type}
        </div>
    );
}
