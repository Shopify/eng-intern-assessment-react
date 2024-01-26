import React, { ReactNode } from "react";

interface StopWatchButtonProps {
  children?: ReactNode;
  isDisabled?: boolean;
  onClick?: () => void;
  type: String;
}

/* Generic Stopwatch button component that takes in custom
  onClick, type: primary/warning/dark and children props */
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
