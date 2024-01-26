import React from 'react'
import Button from 'react-bootstrap/Button';
import './StopWatchButton.css'

interface StopWatchButtonProps {
    variant: string;
    onClick: () => void;
    label: string;
}

export default function StopWatchButton(props: StopWatchButtonProps) {
    return(
        <div>
            <Button variant={props.variant}  onClick={props.onClick}>{props.label}</Button>
        </div>
    )
}