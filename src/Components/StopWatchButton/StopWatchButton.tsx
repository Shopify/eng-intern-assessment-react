import React from 'react'
import Button from 'react-bootstrap/Button';
import './StopWatchButton.css'

/*
    Define the props for the StopWatchButton component
    variant: the variant of the button
    onClick: a function that handles the click event
    label: the label for the button
*/

interface StopWatchButtonProps {
    variant: string;
    onClick: () => void;
    label: string;
}

/*
    StopWatchButton component that displays the button
*/
export default function StopWatchButton(props: StopWatchButtonProps) {
    return(
        <div>
            <Button variant={props.variant}  onClick={props.onClick}>{props.label}</Button>
        </div>
    )
}