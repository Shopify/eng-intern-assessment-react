import React from 'react';
import './StopWatch.css';

interface StopwatchButtonProps {
    onClick: () => void;
    disabled?: boolean; //optional
    children: React.ReactNode;
}

const StopwatchButton: React.FC<StopwatchButtonProps> = ({ onClick, disabled, children }) => {
// for styling purposes of each button
    const buttonClassName =
        children === 'START'
            ? 'button'
            : children === 'STOP'
                ? 'button running'
                : children === 'LAP'
                    ? 'button lap'
                    : children === 'RESET'
                        ? 'button reset'
                        : '';

    return (
        <button className={buttonClassName} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

export default StopwatchButton;
