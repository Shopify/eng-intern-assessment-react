import React from "react";

interface ButtonProps {
  onClick: () => void;
  label: string;
  disabled: boolean;
}

export default function StopWatchButton({
  onClick,
  label,
  disabled,
}: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
