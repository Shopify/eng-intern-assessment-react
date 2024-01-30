import React from 'react'

export enum ButtonVariant {
    Green,
    Yellow,
    Red,
}

// Determines the button color based on the button variant
const colorForVariant = (variant: ButtonVariant) => {
    switch(variant) {
        case ButtonVariant.Green:
            return '#CDEAC0'; // Green color
        case ButtonVariant.Yellow:
            return '#EFE9AE'; //Yellow color
        case ButtonVariant.Red:
            return '#FF928B'; // Red color
    }
}

type StopWatchButtonProps = { variant: ButtonVariant, children: React.ReactNode, onClick: () => void }

// StopWatchButton renders a styled button based on the provided variant
export default function StopWatchButton({ variant, children, onClick }: StopWatchButtonProps) {
    // Determinate the color based on the provide props.variant
    const color = colorForVariant(variant);
    
    return(
        <button className="stopwatch-btn" style={{
            border: `2px solid ${color}`,
            color,
        }} onClick={onClick}>
            {children}
        </button>
    )
}