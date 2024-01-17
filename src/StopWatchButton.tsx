import React from 'react';

interface StopWatchButtonProps {
    title: string;
    func: () => void;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ title, func }) => (
    <button onClick={func}>{title}</button>
);

export default StopWatchButton;