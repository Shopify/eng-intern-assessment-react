import React from 'react';

interface StopwatchButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string; 
 
}

export default function StopwatchButton({ onClick, label, disabled, className, ariaLabel }: StopwatchButtonProps) {
  return (
    <div>
      <button onClick={onClick} disabled={disabled} className={className} aria-label={ariaLabel}>
        {label}
      </button>
    </div>
  );
}
