import React from 'react';
import { useState } from "react";

export default function LapResetButton() {
    const buttonStyleReset = {
        borderRadius: '50px',
        padding: '20px 20px',
        width: '90px',
        backgroundColor: '#999999',
        color: '#fff',
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
    };

    const buttonStyleLap = {
        borderRadius: '50px',
        padding: '20px 20px',
        width: '90px',
        backgroundColor: '#7F7F7F',
        color: '#fff',
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
    };

    const lapText = "Lap";
    const resetText = "Reset";


    const [style, setStyle] = useState(true);

    const toggleStyle = () => {
        setStyle((prevStyle) => !prevStyle);
    };

    const currentStyle = style ? buttonStyleLap : buttonStyleReset;
    const currentText = style ? lapText : resetText;

    return (
        <button
            style={currentStyle}
            onClick={toggleStyle}
        >
            {currentText}
        </button>
    );
}