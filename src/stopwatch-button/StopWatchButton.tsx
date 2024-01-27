import React, { ReactNode } from 'react';

type StopWatchButtonProps = {
    onClick: () => void;
    children?: ReactNode;
};

export default function StopWatchButton({ onClick, children }: StopWatchButtonProps) {
    return (
        <button onClick={onClick}>
            {children}
        </button>
    );
}

StopWatchButton.defaultProps = {
    children: [],
};
