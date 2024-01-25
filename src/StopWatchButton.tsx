import React from 'react';

type StopwatchButtonProps = {
  action: () => void;
  label: string;
};

export default function StopwatchButton({ action, label }: StopwatchButtonProps) {
  return (
    <button onClick={action}>{label}</button>
  );
}
