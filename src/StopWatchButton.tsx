import React, { ReactNode } from "react";

interface StopWatchButtonProps {
    children?: ReactNode;
    isDisabled?: boolean;
    onClick?: () => void;
}

const StopWatchButton = ({
    children,
    isDisabled,
    onClick,
}: StopWatchButtonProps) => {
    return (
        <button
            className="stop-watch-button"
            disabled={isDisabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default StopWatchButton;
