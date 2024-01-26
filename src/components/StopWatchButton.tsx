import React from "react";

type StopwatchButtonProps = {
  action: () => void;
  label: string;
  ariaLabel?: string;
};

export default function StopwatchButton({
  action,
  label,
  ariaLabel,
}: StopwatchButtonProps) {
  return (
    <button onClick={action} aria-label={ariaLabel || label}>
      {label}
    </button>
  );
}
