import React, { ReactNode } from "react";

interface StopWatchButtonProps {
  children?: ReactNode;
  isDisabled?: boolean;
  onClick?: () => void;
  type: String;
}

export default function StopWatchButton({
  children,
  isDisabled,
  onClick,
  type,
}: StopWatchButtonProps) {
  return (
    <button
      className={`btn btn-${type}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
