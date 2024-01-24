import React from 'react';

type StopwatchButtonProps = {
    onClick: () => void;
    label: string;
};

const StopwatchButton: React.FC<StopwatchButtonProps> = ({ onClick, label }) => {
    return <button onClick={onClick}>{label}</button>;
};

export default StopwatchButton;