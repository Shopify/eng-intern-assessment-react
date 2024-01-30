import React from 'react';
import '../styles/StopWatchButton.css';

/*
 *
 * @description Props for the StopWatchButton component
 *
 * @prop onClick: () => void
 * @prop label: string
 *
 */
interface ButtonProps {
    onClick: () => void;
    label: string;
};

/*
 *
 * @description StopWatchButton component
 *
 * @param onClick: () => void
 * @param label: string
 *
 */
const StopWatchButton: React.FC<ButtonProps> = ({ onClick, label }) => {
    return (
        <button className="watch-button" onClick={ onClick }>
            { label }
        </button>
    );
};

export default StopWatchButton;