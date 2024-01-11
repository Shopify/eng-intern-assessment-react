import React from 'react';

interface StopWatchButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export default function StopWatchButton(props: StopWatchButtonProps) {
  return <button onClick={props.onClick}>{props.children}</button>;
}
