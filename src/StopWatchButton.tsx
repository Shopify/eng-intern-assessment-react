import React from 'react';

// Add className prop to StopwatchButtonProps
type StopwatchButtonProps = {
    onClick: () => void;
    label: string;
    disabled: boolean;
    className?: string; // Make className an optional prop
};

const StopwatchButton: React.FC<StopwatchButtonProps> = ({ onClick, label, disabled, className = "button" }) => {
    return (
        // Add className prop to button
        <button className={className} onClick={onClick} disabled={disabled}>
            {label}
        </button>
    );
};

export default StopwatchButton;
