import React from 'react'

export enum ButtonVariant {
    Green,
    Yellow,
    Red,
}

const colorForVariant = (variant: ButtonVariant) => {
    switch(variant) {
        case ButtonVariant.Green:
            return '#a0d468';
        case ButtonVariant.Yellow:
            return '#FFce54';
        case ButtonVariant.Red:
                return '#e9573f';
    }

}

// <StopWatchButton variant={ButtonVariant.Green} onClick={start}>Start</StopWatchButton>
// <StopWatchButton variant={ButtonVariant.Yellow} onClick={addLap}>Lap</StopWatchButton>
// <StopWatchButton variant={ButtonVariant.Red} onClick={stop}>Stop</StopWatchButton>

type StopWatchButtonProps = { variant: ButtonVariant, children: React.ReactNode, onClick: () => void }

export default function StopWatchButton({ variant, children, onClick }: StopWatchButtonProps) {
    // decide on the color based on props.variant
    const color = colorForVariant(variant);
    return(
        <div className="stopwatch-btn" style={{
            border: `2px solid ${color}`,
            color,
        }} onClick={onClick}>
            {children}
        </div>
    )
}