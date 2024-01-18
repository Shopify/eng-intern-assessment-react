import React from 'react';

interface StopWatchButtonProps {
    onPress: (event: React.MouseEvent<HTMLButtonElement>) => void;
    label: string;
    isPressed: boolean;
}

export default function StopWatchButton({ onPress, label, isPressed }: StopWatchButtonProps) {

    /**
     * Attach an appropriate className to this button based on params.
     */
    const putClassName = () => {
        // I originally did this as a long terinary opperator
        // but it was a bit messy so I extracted it into its own function.
        let classes = ["stopwatch-button"];

        classes.push(`stopwatch-${label.toLowerCase()}`);  // Each button's ID for styling

        if(isPressed) classes.push("stopwatch-button-pressed");

        return classes.join(" ");
    }

    return(
        <button 
            type="button" 
            className={putClassName()} 
            onClick={onPress}>{label}
        </button>
    );
}
