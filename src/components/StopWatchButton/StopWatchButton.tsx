import React from "react";

interface StopWatchButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export default function StopWatchButton({
  children,
  onClick,
  disabled = false,
}: StopWatchButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
