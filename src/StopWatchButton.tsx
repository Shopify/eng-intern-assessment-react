import React from 'react'
import { Buttons } from './StopWatch'
import './StopWatchButton.css'

type ButtonProps = {
    type: Buttons;
    onClick?: () => void;
}
export default function StopWatchButton({ type, onClick }: ButtonProps) {
    return (
        <button onClick={onClick}>{type}</button>
    )
}