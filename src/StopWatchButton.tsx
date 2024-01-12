import React from "react";

interface StopWatchButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function StopWatchButton(props: StopWatchButtonProps) {
  return <button {...props} />;
}
