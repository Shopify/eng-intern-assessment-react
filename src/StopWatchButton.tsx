import React from 'react';

type StopwatchButtonProps = {
    onClick: () => void;
    label: string;
    disabled: boolean;
};

const StopwatchButton: React.FC<StopwatchButtonProps> = ({ onClick, label, disabled }) => {
    return <button onClick={onClick} disabled={disabled}>{label}</button>;
};

export default StopwatchButton;
