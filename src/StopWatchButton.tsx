import React from 'react';

function StyledButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="px-4 py-2 bg-gray-500 text-white rounded"
      {...props}
    >
      {children}
    </button>
  );
}

export interface StopWatchButtonProps {
  onResume: () => void;
  onPause: () => void;
  onReset: () => void;
  onLap: () => void;
}

export default function StopWatchButton({
  onResume,
  onPause,
  onReset,
  onLap,
}: StopWatchButtonProps) {
  return (
    <div className="flex space-x-4 justify-center">
      <StyledButton onClick={onResume}>Start</StyledButton>
      <StyledButton onClick={onPause}>Stop</StyledButton>
      <StyledButton onClick={onReset}>Reset</StyledButton>
      <StyledButton onClick={onLap}>Lap</StyledButton>
    </div>
  );
}
