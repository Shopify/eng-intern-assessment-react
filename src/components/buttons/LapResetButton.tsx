import React from 'react';
import { useState } from "react";

interface LapResetButtonProps {
    lapReset: boolean;
}

export default function LapResetButton({ lapReset }: LapResetButtonProps) {
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

    const currentStyle = lapReset ? buttonStyleLap : buttonStyleReset;
    const currentText = lapReset ? lapText : resetText;

    return (
        <button
            style={currentStyle}
        // onClick= {}
        >
            {currentText}
        </button>
    );
}