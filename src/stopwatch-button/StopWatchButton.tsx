import React, {CSSProperties, ReactNode, useMemo} from 'react';
import './styles.css'

type StopWatchButtonProps = {
    onClick: () => void;
    children?: ReactNode;
};

export default function StopWatchButton({ onClick, children }: StopWatchButtonProps) {
    return (
        <button className="stopwatchButton" onClick={onClick}>
            {children}
        </button>
    );
}

StopWatchButton.defaultProps = {
    children: [],
};
