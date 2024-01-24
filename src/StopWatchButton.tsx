import React from 'react';

// Define a type for the props expected by the StopwatchButton component
type StopwatchButtonProps = {
  action: () => void;
  label: string;
};

export default function StopwatchButton({ action, label }: StopwatchButtonProps) {
  return (
    <button onClick={action}>{label}</button>
  );
}
