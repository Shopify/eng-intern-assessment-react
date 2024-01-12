import React from "react";

interface StopWatchButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}

export default function StopWatchButton(props: StopWatchButtonProps) {
  return <button {...props} />;
}
