import React from 'react';

interface StopwatchButtonProps {
    label: string;
    className: string;
    onClick: () => void;
}

const StopwatchButton: React.FC<StopwatchButtonProps> = (props: StopwatchButtonProps) => {
    return (
        <button className={props.className} onClick={props.onClick}>
            {props.label}
        </button>
    );
};

export default StopwatchButton;