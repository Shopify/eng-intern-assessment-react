import React, { ReactNode } from 'react'

interface StopWatchButtonProps {
    children?: ReactNode;
    onClick?: () => void;
}

const StopWatchButton = ({ children, onClick }: StopWatchButtonProps) => {
    return(
        <button className="stop-watch-button" onClick={onClick}>
            {children}
        </button>
    )
}

export default StopWatchButton;