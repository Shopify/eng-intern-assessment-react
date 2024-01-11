import React, { ReactNode } from 'react'

interface StopWatchButtonProps {
    children?: ReactNode;
    onClick?: () => void;
}

export default function StopWatchButton({ children, onClick }: StopWatchButtonProps) {
    return(
        <button onClick={onClick}>
            {children}
        </button>
    )
}