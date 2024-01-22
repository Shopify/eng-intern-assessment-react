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

/**
 * Renders a resume, pause, reset, and lap button, accepting handler functions for each.
 */
export default function StopWatchButton({
  onResume,
  onPause,
  onReset,
  onLap,
}: StopWatchButtonProps) {
  return (
    <div className="flex space-x-4 justify-center">
      <StyledButton onClick={onResume} data-testid="start-button">
        Start
      </StyledButton>
      <StyledButton onClick={onPause} data-testid="pause-button">
        Pause
      </StyledButton>
      <StyledButton onClick={onReset} data-testid="reset-button">
        Reset
      </StyledButton>
      <StyledButton onClick={onLap} data-testid="lap-button">
        Lap
      </StyledButton>
    </div>
  );
}
