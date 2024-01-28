import React from 'react';
import { useState } from "react";

interface StartStopButtonProps {
    setLapResetButtonType: (lapReset: boolean) => void;
}

export default function StartStopButton({ setLapResetButtonType }: StartStopButtonProps) {
    const buttonStyleStop = {
        borderRadius: '50px',
        padding: '20px 20px',
        width: '90px',
        backgroundColor: '#d9534f',
        color: '#fff',
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
    };

    const buttonStyleStart = {
        borderRadius: '50px',
        padding: '20px 20px',
        width: '90px',
        backgroundColor: '#5cb85c',
        color: '#fff',
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
    };

    const startText = "Start";
    const stopText = "Stop";

    const [style, setStyle] = useState(true);

    const toggleStyle = () => {
        setStyle((prevStyle) => !prevStyle);

        setLapResetButtonType(style);
    };

    const currentStyle = style ? buttonStyleStart : buttonStyleStop;
    const currentText = style ? startText : stopText;

    return (
        <button
            style={currentStyle}
            onClick={toggleStyle}
        >
            {currentText}
        </button>
    );
}