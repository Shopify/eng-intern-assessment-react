import React from 'react';

// Props interface for the StopwatchButton component
interface StopwatchButtonProps {
  onClick: () => void;    // Function to be called on button click
  label: string;          // Label text for the button
  disabled?: boolean;     // Optional prop to disable the button
  className?: string;     // Optional prop for custom styling
  ariaLabel?: string;     // Optional prop for setting the ARIA label
}

// Functional component representing a customizable button for a stopwatch
export default function StopwatchButton({ onClick, label, disabled, className, ariaLabel }: StopwatchButtonProps) {
  return (
    <div>
  
      <button onClick={onClick} disabled={disabled} className={className} aria-label={ariaLabel}>
        {label}
      </button>
    </div>
  );
}
