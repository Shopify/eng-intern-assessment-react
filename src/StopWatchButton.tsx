import React from 'react';

type Props = {
  label: string;
  handleClick: () => void;
};

export default function StopWatchButton({ label, handleClick }: Props) {
  return <button onClick={handleClick}>{label}</button>;
}
