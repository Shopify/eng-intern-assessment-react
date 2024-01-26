import React from "react";

type StopWatchButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  label: string;
};

export default function StopWatchButton({
  onClick,
  disabled,
  label,
}: StopWatchButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
