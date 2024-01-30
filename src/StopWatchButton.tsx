import React from 'react'

interface Props {
    children?: React.ReactNode;
    className?: string;
    onClick: () => void;
}
// this is a custom button component with an Props interface
export default function StopWatchButton({ className, children, onClick }: Props) {
    return (
        <div>
            <button onClick={onClick} className={`${className}`}>{children}</button>
        </div>
    );
}

